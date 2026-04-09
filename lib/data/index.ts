import { CategoriesType, Products } from "@/types";
import pool from "../db";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-super-securise-2026';


type Params = {
  category_id?: string;
  is_new?: boolean;
  is_promo?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
};
export async function getAllProducts({ category_id = 'all', is_new, is_promo, search, limit = 20, offset = 0 }: Params = {}) {
  const conditions = [];
  const params = [];
  let idx = 1;

  if (category_id !== 'all') { conditions.push(`p.category_id = $${idx++}`); params.push(category_id); }
  if (is_new !== undefined) { conditions.push(`p.is_new = $${idx++}`); params.push(is_new); }
  if (is_promo !== undefined) { conditions.push(`p.is_promo = $${idx++}`); params.push(is_promo); }
  if (search) { conditions.push(`p.name ILIKE $${idx++}`); params.push(`%${search}%`); }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  params.push(limit, offset);

  const { rows } = await pool.query(
    `SELECT p.*, c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     ${where}
     ORDER BY p.created_at DESC
     LIMIT $${idx++} OFFSET $${idx}`,
    params
  );
  return rows;
}

export async function getFeaturedProducts(): Promise<Products> {
  try {
    const result = await pool.query(`
      SELECT p.*, c.name as category
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_new = true OR p.is_promo = true 
      ORDER BY p.created_at DESC 
      LIMIT 4
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}
export async function getProductBySlug(slug: string) {
  const { rows } = await pool.query(
    `SELECT p.*, c.name AS category
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     WHERE p.slug = $1`,
    [slug]
  );
  return rows[0] ?? null;
}

export async function getProductById(id: string) {
  try {
    const result = await pool.query(`
      SELECT p.*, c.name as category
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      throw new Error('Produit non trouvé');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}
export async function getAllCategories(): Promise<CategoriesType> {
  const { rows } = await pool.query(
    `SELECT * FROM categories ORDER BY name ASC`
  );
  return rows;
}


export async function getCategoryById(id: string) {
  const { rows } = await pool.query(
    `SELECT * FROM categories WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}


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

 export  async function findCartItemsByUser(user_id:string) {
    const { rows } = await pool.query(
      `SELECT ci.*, p.name, p.price, p.discount_price, p.discount_percentage, p.stock
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = $1
       ORDER BY ci.created_at ASC`,
      [user_id]
    );
    return rows;
  }

export async function getCurrentUser(): Promise<{ id: string; full_name: string; email: string; phone: string; created_at: Date } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };

    const result = await pool.query(
      'SELECT id, full_name, email, phone, created_at FROM users WHERE id = $1',
      [decoded.userId]
    );

    return result.rows[0] || null;
  } catch (error) {
    return null;
  }
}





// lib/db/favorites.ts
export async function getUserFavoritesIds(userId: string): Promise<string[]> {
  const result = await pool.query(
    'SELECT product_id FROM favorites WHERE user_id = $1',
    [userId]
  );
  // On retourne un tableau d'IDs : ['uuid-1', 'uuid-2', ...]
  return result.rows.map(row => row.product_id);
}


export async function isFavorite(user_id: string, product_id: string) {
  const { rows } = await pool.query(
    `SELECT 1 FROM favorites WHERE user_id = $1 AND product_id = $2`,
    [user_id, product_id]
  );
  return rows.length > 0;
}



export async function findFavoritesByUser(user_id: string) {
  const { rows } = await pool.query(
    `SELECT f.*, p.name, p.slug, p.image_url, p.price, p.discount_price,
              p.discount_percentage, p.is_promo, p.color, p.color_hex
       FROM favorites f
       JOIN products p ON p.id = f.product_id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
    [user_id]
  );
  return rows;
}
// CHECK — est-ce que le produit est en favori ?

// REMOVE
export async function remove(user_id: string, product_id: string) {
  const { rowCount } = await pool.query(
    `DELETE FROM favorites WHERE user_id = $1 AND product_id = $2`,
    [user_id, product_id]
  );
  return rowCount! > 0;
}


export async function add(user_id: string, product_id: string) {
  const { rows } = await pool.query(
    `INSERT INTO favorites (user_id, product_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, product_id) DO NOTHING
       RETURNING *`,
    [user_id, product_id]
  );
  return rows[0] || null;
}

export async function getFavoritesByUser(user_id:string) {
  const { rows } = await pool.query(
    `SELECT f.id AS favorite_id, f.created_at,
             p.*, c.name as category
     FROM favorites f
     JOIN products p ON p.id = f.product_id
     JOIN categories c ON p.category_id = c.id 
     WHERE f.user_id = $1
     ORDER BY f.created_at DESC`,
    [user_id]
  );
  return rows;
}





export async function getUserById(id:string) {
  const { rows } = await pool.query(
    `SELECT id, full_name, email, phone, address, city, role, created_at
     FROM users
     WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}
