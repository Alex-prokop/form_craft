// routes/templateRoutes.ts
import { Router } from 'express';
import {
  getAllTemplates,
  createTemplate,
  getTemplateById,
} from '../controllers/templateController';

const router = Router();

// Получить все шаблоны
router.get('/templates', getAllTemplates);

// Создать новый шаблон
router.post('/templates', createTemplate);

// Получить шаблон по ID
router.get('/templates/:templateId', getTemplateById);

export default router;
