import {  CategoriesType, Products } from "@/types";
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
export async function getAllProducts({ category_id= 'all', is_new, is_promo, search, limit = 20, offset = 0 }: Params = {}) {
  const conditions = [];
  const params     = [];
  let   idx        = 1;

  if (category_id !== 'all') { conditions.push(`p.category_id = $${idx++}`); params.push(category_id); }
  if (is_new  !== undefined) { conditions.push(`p.is_new = $${idx++}`);  params.push(is_new); }
  if (is_promo !== undefined) { conditions.push(`p.is_promo = $${idx++}`); params.push(is_promo); }
  if (search)  { conditions.push(`p.name ILIKE $${idx++}`); params.push(`%${search}%`); }

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

export async function getFeaturedProducts():Promise<Products> {
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
export async function getAllCategories():Promise<CategoriesType> {
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