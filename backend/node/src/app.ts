import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userRoutes from './routes/userRoutes';
import restaurantRoutes from './routes/restaurantRoutes'; // Import the restaurant routes

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.use('/api/users', userRoutes);
app.use('/api', restaurantRoutes); // Add the restaurant routes

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
