import { Request, Response } from 'express';
import db from '../config/db';

export const getRestaurants = (req: Request, res: Response) => {
  const query = 'SELECT id, name, address, cuisine FROM restaurants';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getRestaurantDetails = (req: Request, res: Response) => {
  const { id } = req.params;
  const query = 'SELECT * FROM restaurants WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};

export const getGroceryItems = (req: Request, res: Response) => {
  const query = 'SELECT id, name, category, price, availability FROM groceries';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

export const getGroceryItemDetails = (req: Request, res: Response) => {
  const { id } = req.params;
  const query = 'SELECT * FROM groceries WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
};
