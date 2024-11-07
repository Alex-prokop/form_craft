// src/routes/jiraRoutes.ts
import { Router } from 'express';
import JiraController from '../controllers/JiraController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/create-ticket', authMiddleware, JiraController.createTicket);
router.get('/user-tickets', authMiddleware, JiraController.getUserTickets);

export default router;
