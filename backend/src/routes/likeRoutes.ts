// routes/likeRoutes.ts
import { Router } from 'express';
import {
  getLikesByTemplate,
  createLike,
  deleteLike,
} from '../controllers/likeController';

const router = Router();

// Получить все лайки для шаблона
router.get('/templates/:templateId/likes', getLikesByTemplate);

// Поставить лайк шаблону
router.post('/templates/:templateId/likes', createLike);

// Удалить лайк (логическое удаление)
router.delete('/templates/:templateId/likes', deleteLike);

export default router;
