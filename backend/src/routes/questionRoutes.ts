// routes/questionRoutes.ts
import { Router } from 'express';
import {
  getQuestionsByTemplate,
  createQuestion,
} from '../controllers/questionController';

const router = Router();

// Получить все вопросы для шаблона
router.get('/templates/:templateId/questions', getQuestionsByTemplate);

// Создать новый вопрос для шаблона
router.post('/templates/:templateId/questions', createQuestion);

export default router;
