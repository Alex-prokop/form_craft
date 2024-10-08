import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Получение всех пользователей (для администраторов)
router.get('/users', authMiddleware, getAllUsers);

// Получение пользователя по ID
router.get('/users/:id', authMiddleware, getUserById);

// Обновление пользователя
router.put('/users/:id', authMiddleware, updateUser);

// Удаление пользователя
router.delete('/users/:id', authMiddleware, deleteUser);

export default router;
