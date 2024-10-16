import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  changeUserRole, 
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

// Только администраторы могут блокировать пользователей
router.post('/:id/block', authMiddleware, isAdmin, blockUser);

// Только администраторы могут разблокировать пользователей
router.post('/:id/unblock', authMiddleware, isAdmin, unblockUser);

// Только администраторы могут изменять роль пользователя
router.put('/:id/role', authMiddleware, isAdmin, changeUserRole); // Новый маршрут для изменения роли

export default router;
