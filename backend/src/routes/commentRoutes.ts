// routes/commentRoutes.ts
import { Router } from 'express';
import {
  getCommentsByTemplate,
  createComment,
} from '../controllers/commentController';

const router = Router();

// Получить все комментарии для шаблона
router.get('/templates/:templateId/comments', getCommentsByTemplate);

// Добавить новый комментарий к шаблону
router.post('/templates/:templateId/comments', createComment);

export default router;
