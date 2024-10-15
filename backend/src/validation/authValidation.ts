import { body } from 'express-validator';
import {
  findUserByUsername,
  findUserByEmail,
} from '../repositories/userRepository';
import { UserExistsError } from '../errors/errors';

// Проверки на валидность данных
export const registerValidation = [
  body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Имя пользователя должно содержать минимум 3 символа')
    .custom(async (username) => {
      const existingUser = await findUserByUsername(username);
      if (existingUser) {
        // Если пользователь с таким именем уже существует, выбрасываем ошибку
        throw new UserExistsError('Имя пользователя уже занято');
      }
      // Если пользователь не найден, возвращаем true (нет ошибки)
      return true;
    }),

  body('email')
    .isEmail()
    .withMessage('Введите корректный email')
    .custom(async (email) => {
      const existingEmail = await findUserByEmail(email);
      if (existingEmail) {
        // Если пользователь с таким email уже существует, выбрасываем ошибку
        throw new UserExistsError('Email уже занят');
      }
      // Если пользователь не найден, возвращаем true (нет ошибки)
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
