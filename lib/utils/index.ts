import pool from "../db";

export async function createOrder({ user_id, total_amount, shipping_fee, payment_method, address, phone, items }: {
    user_id: string;
    total_amount: number;
    shipping_fee: number;
    payment_method: string;
    address: string;
    phone: string;
    items: {
        product_id: number;
        quantity: number;
        price_at_purchase: number;
        size?: string | null;
        color?: string | null;
    }[];
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
                [order.id, item.product_id, item.quantity, item.price_at_purchase, item.size ?? null, item.color ?? null]
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

