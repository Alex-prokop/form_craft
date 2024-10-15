import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import {
  getAllUsers as getAllUsersService,
  getUserById as getUserByIdService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from '../services/userService';

export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении пользователей' });
  }
};

export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.params.id);

  if (req.user?.role !== 'admin' && req.user?.id !== userId) {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  try {
    const user = await getUserByIdService(userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении пользователя' });
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.params.id);

  if (req.user?.role !== 'admin' && req.user?.id !== userId) {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  try {
    const updatedUser = await updateUserService(userId, req.body);
    res
      .status(200)
      .json({ message: 'Пользователь обновлен', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении пользователя' });
  }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.params.id);

  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  try {
    await deleteUserService(userId);
    res.status(200).json({ message: 'Пользователь удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении пользователя' });
  }
};
