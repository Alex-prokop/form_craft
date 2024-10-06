import { Router } from 'express';
import { getMessage, getTestData } from '../controllers/messageController';

const router = Router();

router.get('/message', getMessage);
router.get('/test-db', getTestData);

export default router;
