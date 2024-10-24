import { Router } from 'express';
import {
  getAllTemplates,
  createTemplate,
  getTemplateById,
} from '../controllers/templateController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Применение middleware авторизации
router.get('/templates', authMiddleware, getAllTemplates);
router.post('/templates', authMiddleware, createTemplate);
router.get('/templates/:templateId', authMiddleware, getTemplateById);

export default router;
