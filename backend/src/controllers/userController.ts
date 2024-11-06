import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import {
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  blockUserService,
  unblockUserService,
  changeUserRoleService,
} from '../services/userService';

// Получение всех активных пользователей (только для администратора)
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

// Получение активного пользователя по ID (администратор или сам пользователь)
export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.params.id);

  // Проверка: администратор или сам пользователь
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

// Обновление данных пользователя (администратор или сам пользователь)
export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.params.id);

  // Только администратор или сам пользователь могут обновлять данные
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

// Мягкое удаление пользователя (только администратор)
export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.params.id);

  // Только администратор может удалять пользователей
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

// Блокировка пользователя (только администратор)
export const blockUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.params.id);

  // Только администратор может блокировать пользователей
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  try {
    await blockUserService(userId);
    res.status(200).json({ message: 'Пользователь заблокирован' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при блокировке пользователя' });
  }
};

// Разблокировка пользователя (только администратор)
export const unblockUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.params.id);

  // Только администратор может разблокировать пользователей
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  try {
    await unblockUserService(userId);
    res.status(200).json({ message: 'Пользователь разблокирован' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при разблокировке пользователя' });
  }
};

// Изменение роли пользователя (доступно только администратору)
export const changeUserRole = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = parseInt(req.params.id);
  const { newRole } = req.body; // Получаем новую роль из тела запроса

  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }

  try {
    const updatedUser = await changeUserRoleService(userId, newRole);
    res
      .status(200)
      .json({ message: 'Роль пользователя обновлена', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при изменении роли пользователя' });
  }
};
1;
