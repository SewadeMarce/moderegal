'use server';
import { revalidatePath } from "next/cache";
import pool from "../db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import stripe from "../utils/stripe";
import { add, getCurrentUser, isFavorite, remove } from "../data";
import { CartItemType, ProductCart } from "@/types";
import { kkiapayClient } from "../utils/kkiapay";

const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-super-securise-2026';


export async function addToCart(product_id: string, product: ProductCart, quantity: number = 1,) {
  console.log('ajout de produt:', product.image_url);

  const user = await getCurrentUser()
  try {


    // Vérifier si l'article est déjà dans le panier
    const existing = await pool.query(
      'SELECT id, quantity FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [user?.id, product_id]
    );

    if (existing.rows.length > 0) {
      // Mise à jour de la quantité
      await pool.query(
        'UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2',
        [quantity, existing.rows[0].id]
      );
    } else {
      // Insertion nouvelle ligne
      await pool.query(
        'INSERT INTO cart_items (user_id, product_id, quantity,size,color,image_url) VALUES ($1, $2, $3,$4,$5,$6)',
        [user?.id, product_id, quantity, product.size, product.color, product.image_url]
      );
    }

    revalidatePath('/');
    return { success: true, message: 'Produit ajouté au panier' };
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error('Erreur lors de l\'ajout au panier');
  }
};
export async function getCartItems(userId: string) {
  try {
    const result = await pool.query(`
      SELECT 
        ci.id,
        ci.quantity,
        p.id as product_id,
        p.name,
        p.price,
        p.image_url,
        p.size[1],
        p.color[1]
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = $1
      ORDER BY ci.created_at DESC
    `, [userId]);

    return result.rows;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return [];
  }
};
export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  try {
    if (quantity < 1) throw new Error('Quantité invalide');

    await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2',
      [quantity, cartItemId]
    );

    revalidatePath('/cart');
    return { success: true };
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};
export async function removeFromCart(cartItemId: string) {
  try {
    await pool.query('DELETE FROM cart_items WHERE id = $1', [cartItemId]);
    revalidatePath('/cart');
    return { success: true };
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};
export async function clearCart(userId: string) {
  try {
    await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};


export async function createPaymentIntent(metadata: { userId: string; fullName: string; phone: string; email: string; address: string; city: string; }) {

  const user = await getCurrentUser()
  //     // Récupérer le panier
  const cartItems = await getCartItems(user?.id as string);
  if (cartItems.length === 0) {
    throw new Error("Panier vide");
  }

  const subtotal = cartItems.reduce(
    (s, i) => s + Number(i.price) * i.quantity, 0
  );
  const shipping = subtotal > 100000 ? 0 : 1500;
  const total = subtotal + shipping;


  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,           // en FCFA
      currency: 'xof',
      metadata: {
        ...metadata,
        shipping
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent.client_secret!;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de créer le paiement");
  }
}

export async function createOrderByStripe(data: { user_id: string; total_amount: number; shipping_fee: number; payment_method: string; address: string; phone: string; status: string, shipping_adress?: Record<string,string> }) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const cartItems = await getCartItems(data.user_id as string);
    if (cartItems.length === 0) {
      throw new Error("Panier vide");
    }
    // 1. Insérer la commande
    const { rows: orderRows } = await client.query(
      `INSERT INTO orders (user_id, total_amount, shipping_fee, payment_method, address, phone,status,shipping_adress)
       VALUES ($1, $2, $3, $4, $5, $6,$7,$8)
       RETURNING *`,
      [data.user_id, data.total_amount, data.shipping_fee ?? 5000, data.payment_method ?? 'mobile_money', data.address, data.phone, data.status, data.shipping_adress]
    );
    const order = orderRows[0];
    const items: CartItemType[] = cartItems.map((item) => ({ ...item, price: Number(item.price) }));

    // 2. Insérer les items + décrémenter le stock
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, size, color)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, item.product_id, item.quantity, item.price, item.size ?? null, item.color ?? null]
      );


    }

    await pool.query('DELETE FROM cart_items WHERE user_id = $1', [data.user_id]);

    await client.query('COMMIT');
    revalidatePath('/')
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function updateOrderStatus(id: string, status: string) {
  const validStatuses = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Statut invalide : ${status}`);
  }

  const { rows } = await pool.query(
    `UPDATE orders
     SET status     = $1,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );
  return rows[0] ?? null;
}

export async function createOrder({ user_id, total_amount, shipping_fee, payment_method, address, phone, items }: {
  user_id: string;
  total_amount: number;
  shipping_fee: number;
  payment_method: string;
  address: string;
  phone: string;
  items: CartItemType[];
}) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Insérer la commande
    const { rows: orderRows } = await client.query(
      `INSERT INTO orders (user_id, total_amount, shipping_fee, payment_method, address, phone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, total_amount, shipping_fee ?? 5000, payment_method ?? 'mobile_money', address, phone]
    );
    const order = orderRows[0];

    // 2. Insérer les items + décrémenter le stock
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, size, color)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, item.product_id, item.quantity, item.price, item.size ?? null, item.color ?? null]
      );



    }

    await client.query('COMMIT');
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}


export async function createOrderKkiapay({ user_id, total_amount, shipping_fee, address, phone, items }: {
  user_id: string;
  total_amount: number;
  shipping_fee: number;
  address: string;
  phone: string;
  items: CartItemType[];
}) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Insérer la commande
    const { rows: orderRows } = await client.query(
      `INSERT INTO orders (user_id, total_amount, shipping_fee, payment_method, address, phone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, total_amount, shipping_fee ?? 5000, 'mobile_money', address, phone]
    );
    const order = orderRows[0];

    // 2. Insérer les items + décrémenter le stock
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, size, color)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, item.product_id, item.quantity, item.price, item.size ?? null, item.color ?? null]
      );



    }

    await client.query('COMMIT');
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}


export async function registerUser(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const phone = formData.get('phone') as string;

  if (!fullName || !email || !password) {
    throw new Error("Tous les champs obligatoires doivent être remplis");
  }

  try {
    // Vérifier si l'email existe déjà
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      throw new Error("Cet email est déjà utilisé");
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Créer l'utilisateur
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, phone)
       VALUES ($1, $2, $3, $4) RETURNING id, full_name, email`,
      [fullName, email, passwordHash, phone]
    );

    const user = result.rows[0];

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Sauvegarder le token dans un cookie httpOnly
    (await cookies()).set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });
    revalidatePath('/');
    return user;
  } catch (error) {
    console.error('Error during registration:', error);
    throw new Error("Erreur lors de l'inscription");
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    throw new Error("Email et mot de passe sont requis");
  }

  try {
    const result = await pool.query(
      'SELECT id, full_name, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const user = result.rows[0];

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error("Email ou mot de passe incorrect");
    }

    // Générer token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    (await cookies()).set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    });
    revalidatePath('/');
    return user
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error("Erreur lors de la connexion");
  }
}

export async function logoutUser() {
  (await cookies()).delete('auth-token');
  redirect('/auth');
}

export async function verifyOrder(transactionId: string, shipping_adress?: Record<string,string>) {

  const tx = await kkiapayClient.verify(transactionId);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Insérer la commande
    const cartItems = await getCartItems(tx.partnerId as string);
    const shipping_fee = tx.amount > 100000 ? 0 : 1500;
    const address = tx.metadata?.address || "Adresse non fournie";
    const phone = tx.metadata?.phone || "Téléphone non fourni";

    const status = tx.status === "SUCCESS" ? "paid" : "failed";
    const { rows: orderRows } = await client.query(
      `INSERT INTO orders (user_id, total_amount, shipping_fee, payment_method, address, phone,status,shipping_adress)
       VALUES ($1, $2, $3, $4, $5, $6,$7,$8)
       RETURNING *`,
      [tx.partnerId, tx.amount, shipping_fee, 'mobile_money', address, phone, status, shipping_adress]
    );
    const order = orderRows[0];

    const items: CartItemType[] = cartItems.map((item) => ({ ...item, price: Number(item.price) }));

    // 2. Insérer les items + décrémenter le stock
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, size, color)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, item.product_id, item.quantity, item.price, item.size ?? null, item.color ?? null]
      );
    }


    await client.query('COMMIT');
    revalidatePath('/');
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}


export async function getOrdersByUser(user_id: string) {
  const { rows } = await pool.query(
    `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
    [user_id]
  );
  return rows;
}





export async function toggle(user_id: string, product_id: string) {
  const exists = await isFavorite(user_id, product_id);
  if (exists) {
    await remove(user_id, product_id);
    revalidatePath('/')
    return { favorited: false };
  } else {
    await add(user_id, product_id);
    revalidatePath('/')

    return { favorited: true };
  }
}





