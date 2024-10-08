import { Request, Response, NextFunction } from 'express';
import { register, login } from '../services/authService';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  try {
    const result = await register(username, email, password);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const result = await login(email, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
