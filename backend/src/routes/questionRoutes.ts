import { Router } from 'express';
import {
  getQuestionsByTemplate,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get(
  '/templates/:templateId/questions',
  authMiddleware,
  getQuestionsByTemplate
);
router.post('/templates/:templateId/questions', authMiddleware, createQuestion);
router.put('/questions/:questionId', authMiddleware, updateQuestion);
router.delete('/questions/:questionId', authMiddleware, deleteQuestion);

export default router;
