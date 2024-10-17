// routes/tagRoutes.ts
import { Router } from 'express';
import {
  getAllTags,
  createTag,
  getTagById,
} from '../controllers/tagController';

const router = Router();

// Получить все теги
router.get('/tags', getAllTags);

// Создать новый тег
router.post('/tags', createTag);

// Получить тег по ID
router.get('/tags/:id', getTagById);

export default router;
