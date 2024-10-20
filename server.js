const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// User signup
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );
    await pool.query(
      'INSERT INTO user_game_data (user_id, radiant, fluttergems) VALUES ($1, 10000, 20)',
      [result.rows[0].id]
    );
    res.status(201).json({ message: 'User created successfully with 10,000 Radiant and 20 Fluttergems' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Get user game data
app.get('/user-data', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM user_game_data WHERE user_id = $1', [req.user.userId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

// Add a pony
app.post('/add-pony', authenticateToken, async (req, res) => {
  const { name, breed, rarity } = req.body;
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Get the price of the pony based on rarity
    const priceResult = await client.query('SELECT price FROM horse_prices WHERE rarity = $1', [rarity]);
    if (priceResult.rows.length === 0) {
      throw new Error('Invalid rarity');
    }
    const price = priceResult.rows[0].price;
    
    // Check if the user has enough Radiant
    const userDataResult = await client.query('SELECT radiant FROM user_game_data WHERE user_id = $1', [req.user.userId]);
    const userRadiant = userDataResult.rows[0].radiant;
    
    if (userRadiant < price) {
      throw new Error('Insufficient Radiant');
    }
    
    // Deduct the price from the user's Radiant
    await client.query('UPDATE user_game_data SET radiant = radiant - $1 WHERE user_id = $2', [price, req.user.userId]);
    
    // Add the pony
    await client.query(
      'INSERT INTO ponies (user_id, name, breed, rarity) VALUES ($1, $2, $3, $4)',
      [req.user.userId, name, breed, rarity]
    );
    
    await client.query('COMMIT');
    res.status(201).json({ message: 'Pony added successfully', price: price });
  } catch (error) {
    await client.query('ROLLBACK');
    if (error.message === 'Insufficient Radiant') {
      res.status(400).json({ error: 'Insufficient Radiant to purchase this pony' });
    } else if (error.message === 'Invalid rarity') {
      res.status(400).json({ error: 'Invalid rarity specified' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Error adding pony' });
    }
  } finally {
    client.release();
  }
});

// Get horse prices
app.get('/horse-prices', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM horse_prices ORDER BY price');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching horse prices' });
  }
});

// Get user's ponies
app.get('/user-ponies', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ponies WHERE user_id = $1', [req.user.userId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user ponies' });
  }
});

// Add Radiant to user's account (for testing purposes)
app.post('/add-radiant', authenticateToken, async (req, res) => {
  const { amount } = req.body;
  try {
    await pool.query('UPDATE user_game_data SET radiant = radiant + $1 WHERE user_id = $2', [amount, req.user.userId]);
    res.json({ message: `${amount} Radiant added successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding Radiant' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
