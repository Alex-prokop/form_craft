// routes/formRoutes.ts
import { Router } from 'express';
import {
  getFormsByTemplate,
  getFormsByUser,
  createForm,
} from '../controllers/formController';

const router = Router();

// Получить все формы по шаблону
router.get('/templates/:templateId/forms', getFormsByTemplate);

// Получить все формы по пользователю
router.get('/users/:userId/forms', getFormsByUser);

// Создать новую форму
router.post('/templates/:templateId/forms', createForm);

export default router;
