import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role.role_name !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }
  next();
};
