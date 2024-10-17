// routes/templateTagRoutes.ts
import { Router } from 'express';
import {
  getTagsForTemplate,
  addTagToTemplateController,
} from '../controllers/templateTagController';

const router = Router();

// Получить все теги для шаблона
router.get('/templates/:templateId/tags', getTagsForTemplate);

// Добавить тег к шаблону
router.post('/templates/:templateId/tags', addTagToTemplateController);

export default router;
