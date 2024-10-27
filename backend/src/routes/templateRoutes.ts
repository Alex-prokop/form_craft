import { Router } from 'express';
import {
  getAllTemplates,
  getUserTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplateById, // Импорт контроллера для получения шаблона по ID
} from '../controllers/templateController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Роуты для шаблонов
router.get('/templates', getAllTemplates); // Получение всех шаблонов
router.get('/templates/user', authMiddleware, getUserTemplates); // Получение шаблонов конкретного пользователя
router.get('/templates/:templateId', authMiddleware, getTemplateById); // Получение шаблона по ID
router.post('/templates', authMiddleware, createTemplate); // Создание шаблона
router.put('/templates/:templateId', authMiddleware, updateTemplate); // Обновление шаблона
router.delete('/templates/:templateId', authMiddleware, deleteTemplate); // Удаление шаблона

export default router;
