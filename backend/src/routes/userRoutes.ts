import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/isAdminMiddleware';

const router = Router();

// Только администраторы могут получать список пользователей
router.get('/', authMiddleware, isAdmin, getAllUsers);

// Только администраторы могут получать информацию о любом пользователе
router.get('/:id', authMiddleware, isAdmin, getUserById);

// Только администраторы могут обновлять пользователя
router.put('/:id', authMiddleware, isAdmin, updateUser);

// Только администраторы могут удалять пользователей
router.delete('/:id', authMiddleware, isAdmin, deleteUser);

export default router;
