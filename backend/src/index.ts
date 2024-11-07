import express from 'express';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection setup
const client = new Client({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10), // Convert port to number
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Connect to the database
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err.stack));

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/pets', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pet');  // Query the pets table
    res.json(result.rows);  // Return the rows (pets) as JSON
  } catch (err) {
    console.error('Error fetching pets:', err);
    res.status(500).send('Error fetching pets');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

