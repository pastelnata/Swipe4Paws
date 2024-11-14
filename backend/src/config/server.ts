import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200' }));

export default app;