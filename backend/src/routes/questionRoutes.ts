import { Router } from 'express';
import {
  getQuestionsByTemplate,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Получение всех вопросов по шаблону
router.get(
  '/templates/:templateId/questions',
  authMiddleware,
  getQuestionsByTemplate
);

// Получение вопроса по ID
router.get('/questions/:questionId', authMiddleware, getQuestionById);

// Создание нового вопроса
router.post('/templates/:templateId/questions', authMiddleware, createQuestion);

// Обновление вопроса
router.put('/questions/:questionId', authMiddleware, updateQuestion);

// Удаление вопроса (мягкое удаление)
router.delete('/questions/:questionId', authMiddleware, deleteQuestion);

export default router;
