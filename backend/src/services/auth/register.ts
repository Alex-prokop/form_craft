// src/services/auth.ts
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../../repositories/userRepository';
import { findRoleByName } from '../../repositories/roleRepository';
import { UserExistsError } from '../../errors/errors';
import { generateJwtToken } from '../../utils/jwtUtils';
import JiraService from '../JiraService'; // Импортируем JiraService

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  // Проверка, существует ли пользователь с таким email
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new UserExistsError('Пользователь с таким email уже существует');
  }

  // Хешируем пароль
  const password_hash = await bcrypt.hash(password, 10);

  // Находим роль "user" для назначения
  const userRole = await findRoleByName('user');
  if (!userRole) {
    throw new Error('Роль "user" не найдена в базе данных');
  }

  // Создаем нового пользователя в базе данных
  const newUser = await createUser({
    username,
    email,
    password_hash,
    role: userRole,
  });

  // Пытаемся создать учетную запись в Jira
  try {
    await JiraService.createJiraUser(email, username);
    console.log('Jira account successfully created for user:', username);
  } catch (error) {
    console.error('Failed to create Jira account for user:', error);
    // В этом месте можно решить, нужно ли откатывать регистрацию
    // или продолжать, даже если создание в Jira не удалось
  }

  // Генерируем JWT токен для нового пользователя
  const token = generateJwtToken(
    newUser.id,
    newUser.username,
    userRole.role_name
  );

  return {
    message: 'Пользователь успешно зарегистрирован',
    user: newUser,
    token,
  };
};
