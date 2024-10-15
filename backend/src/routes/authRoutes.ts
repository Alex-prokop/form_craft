import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import {
  registerValidation,
  loginValidation,
} from '../validation/authValidation';
import { validationResultMiddleware } from '../middlewares/validationResultMiddleware';

const router = Router();

router.post(
  '/register',
  registerValidation,
  validationResultMiddleware,
  registerUser
);
router.post('/login', loginValidation, validationResultMiddleware, loginUser);

export default router;
