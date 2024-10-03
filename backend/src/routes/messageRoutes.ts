import { Router } from 'express';
import { getMessage } from '../controllers/messageController';

const router = Router();

router.get('/message', getMessage);

export default router;
