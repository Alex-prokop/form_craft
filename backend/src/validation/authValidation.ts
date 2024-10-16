import { body } from 'express-validator';
import {
  findUserByUsername,
  findUserByEmail,
} from '../repositories/userRepository';
import { UserExistsError } from '../errors/errors';

export const registerValidation = [
  body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Имя пользователя должно содержать минимум 3 символа')
    .custom(async (username) => {
      const existingUser = await findUserByUsername(username);
      if (existingUser) {
        throw new UserExistsError('Имя пользователя уже занято');
      }
      return true;
    }),

  body('email')
    .isEmail()
    .withMessage('Введите корректный email')
    .custom(async (email) => {
      const existingEmail = await findUserByEmail(email);
      if (existingEmail) {
        throw new UserExistsError('Email уже занят');
      }
      return true;
    }),

  body('password')
    .isLength({ min: 6 }) // Минимальная длина пароля 6 символов
    .withMessage('Пароль должен содержать минимум 6 символов'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Введите корректный email'),

  body('password').notEmpty().withMessage('Пароль не может быть пустым'),
];
