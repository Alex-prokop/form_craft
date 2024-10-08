import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/ormconfig';
import { User } from '../entities/User';

interface AuthenticatedRequest extends Request {
  user?: User;
}

// Получение всех пользователей (доступно только администраторам)
export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
  if (req.user?.role.role_name !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  res.status(200).json(users);
};

// Получение информации о пользователе по ID
export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.params.id);

  if (req.user?.role.role_name !== 'admin' && req.user?.id !== userId) {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    return res.status(404).json({ message: 'Пользователь не найден' });
  }

  res.status(200).json(user);
};

// Обновление пользователя
export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.params.id);

  if (req.user?.role.role_name !== 'admin' && req.user?.id !== userId) {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  const { username, email, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    return res.status(404).json({ message: 'Пользователь не найден' });
  }

  user.username = username || user.username;
  user.email = email || user.email;
  if (password) {
    user.password_hash = await bcrypt.hash(password, 10);
  }

  await userRepository.save(user);
  res.status(200).json({ message: 'Пользователь обновлен', user });
};

// Удаление пользователя (доступно только администраторам)
export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.params.id);

  if (req.user?.role.role_name !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    return res.status(404).json({ message: 'Пользователь не найден' });
  }

  await userRepository.remove(user);
  res.status(200).json({ message: 'Пользователь удален' });
};
