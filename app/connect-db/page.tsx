import pool from "@/lib/db";


async function getData() {
    const client = await pool.connect();
    try {
        const rows = await client.query(`SELECT * FROM User`);
        console.log("Schéma créé avec succès !");
        return rows;
    } finally {
        client.release();
    }
}

export default async function Page() {
    const data = await getData();
    console.log(data);

    return (
        <div>
            {/* {data.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))} */}
        </div>
    );
}
/**
 *
 * ALTER TABLE order_items
         ADD COLUMN IF NOT EXISTS image_url TEXT;
 */