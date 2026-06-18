import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from './db.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwttokenstacklogix';

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Initialize Database Table and Default User
async function initDatabase() {
  let client;
  try {
    client = await pool.connect();
    
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Database schema initialized.");

    // Seed default users if they don't already exist
    const usersToSeed = [
      { email: 'demo@stacklogix.com', password: 'admin1234' },
      { email: 'sm@stacklogix.com', password: 'Stacklogix' },
      { email: 'kevin@stacklogix.com', password: 'Stacklogix' },
      { email: 'ashmi@stacklogix.com', password: 'Stacklogix' },
      { email: 'jash@stacklogix.com', password: 'Stacklogix' }
    ];

    for (const u of usersToSeed) {
      const userCheck = await client.query('SELECT 1 FROM users WHERE email = $1', [u.email]);
      if (userCheck.rows.length === 0) {
        console.log(`Seeding user: ${u.email}...`);
        const hashedPassword = bcrypt.hashSync(u.password, 10);
        await client.query(
          'INSERT INTO users (email, password) VALUES ($1, $2)',
          [u.email, hashedPassword]
        );
        console.log(`User seeded successfully: ${u.email}`);
      }
    }
  } catch (err) {
    console.error("Database initialization error:", err);
  } finally {
    if (client) client.release();
  }
}

initDatabase();

// Input Validation Middleware
const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push({ field: 'email', message: 'Invalid email format' });
    }
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Login API Endpoint
app.post('/api/auth/login', validateLoginInput, async (req, res) => {
  const { email, password } = req.body;
  let client;

  try {
    client = await pool.connect();
    
    // Find user by email
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Compare passwords
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(`User logged in successfully: ${email}`);
    
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Login API error:", err);
    return res.status(500).json({ message: 'Server database error. Please try again later.' });
  } finally {
    if (client) client.release();
  }
});

// Serve static files from the React build directory
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback all routes to index.html (client-side routing)
app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api/')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(404).send("Not Found");
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
