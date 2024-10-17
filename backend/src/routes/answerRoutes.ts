// routes/answerRoutes.ts
import { Router } from 'express';
import {
  getAnswersByForm,
  createAnswer,
} from '../controllers/answerController';

const router = Router();

// Получить все ответы для формы
router.get('/forms/:formId/answers', getAnswersByForm);

// Создать новый ответ для формы
router.post('/forms/:formId/answers', createAnswer);

export default router;
