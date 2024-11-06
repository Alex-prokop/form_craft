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

router.get('/', authMiddleware, isAdmin, getAllUsers);

router.get('/:id', authMiddleware, getUserById);

router.put('/:id', authMiddleware, isAdmin, updateUser);

router.delete('/:id', authMiddleware, isAdmin, deleteUser);

router.post('/:id/block', authMiddleware, isAdmin, blockUser);

router.post('/:id/unblock', authMiddleware, isAdmin, unblockUser);

router.put('/:id/role', authMiddleware, isAdmin, changeUserRole);

export default router;
