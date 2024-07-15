import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import db from '../config/db';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(query, [email, hashedPassword], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'User registered' });
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  });
};

export const getUserProfile = (req: Request, res: Response) => {
  const userId = req.user.id;
  const query = 'SELECT id, email FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
};
