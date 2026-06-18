import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'database-1.clsc2mcoudv1.ap-south-1.rds.amazonaws.com',
  database: 'stack_db',
  user: 'postgres',
  password: 'Shrey0702',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

async function run() {
  try {
    console.log("Connecting to AWS RDS PostgreSQL...");
    const client = await pool.connect();
    console.log("Connected successfully!");
    
    // Check existing tables
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("Existing tables in 'public' schema:");
    console.log(res.rows);
    
    client.release();
  } catch (err) {
    console.error("Database connection error:", err);
  } finally {
    await pool.end();
  }
}

run();
