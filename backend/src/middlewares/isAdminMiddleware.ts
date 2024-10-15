import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Доступ запрещен. Требуется роль администратора.' });
  }
  next();
};
