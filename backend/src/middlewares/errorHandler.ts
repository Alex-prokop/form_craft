import { NextFunction, Request, Response } from 'express';
import {
  UserExistsError,
  InvalidCredentialsError,
  UserNotFoundError,
  RoleNotFoundError,
} from '../errors/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof UserExistsError ||
    err instanceof InvalidCredentialsError
  ) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof UserNotFoundError || err instanceof RoleNotFoundError) {
    return res.status(404).json({ message: err.message });
  }

  console.error('Internal server error:', err);
  return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
};
