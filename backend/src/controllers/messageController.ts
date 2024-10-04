import { Request, Response } from 'express';
import pool from '../config/dbConfig';

export const getTestData = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Соединение успешно установлено',
      result: result.rows,
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
};

export const getMessage = (req: Request, res: Response) => {
  res.json({ message: 'Привет от бэкенда!' });
};
