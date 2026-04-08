// lib/db.ts
import { Pool } from 'pg';


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false,   // Pour les bases locales ou Render/Neon en dev
  max: 20, // Nombre maximum de connexions dans le pool
});

// Test de connexion au démarrage (optionnel mais utile)
pool.on('connect', () => {
  console.log('✅ Nouvelle connexion PostgreSQL établie');
});

pool.on('error', (err) => {
  console.error('❌ Erreur inattendue du pool PostgreSQL', err);
});

export default pool;