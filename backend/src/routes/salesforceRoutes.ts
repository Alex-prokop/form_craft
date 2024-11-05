import { Router } from 'express';
import { createSalesforceAccount } from '../controllers/salesforceController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Защищенный маршрут для добавления пользователя в Salesforce
router.post('/salesforce/account', authMiddleware, createSalesforceAccount);

export default router;
