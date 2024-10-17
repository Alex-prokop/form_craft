// routes/topicRoutes.ts
import { Router } from 'express';
import {
  getAllTopics,
  createTopic,
  findTopicById,
} from '../controllers/topicController';

const router = Router();

// Получить все темы
router.get('/topics', getAllTopics);

// Создать новую тему
router.post('/topics', createTopic);

// Получить тему по ID
router.get('/topics/:id', findTopicById);

export default router;
