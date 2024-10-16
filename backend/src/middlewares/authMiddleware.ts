import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { id: number; role: string };
}

const parseToken = (authHeader: string | undefined): string | null => {
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return null;
};

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = parseToken(req.headers.authorization);

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Нет токена, авторизация отклонена' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      role: string;
    };

    req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Токен истек' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Неверный токен' });
    }
    next(error);
  }
};
