import bcrypt from 'bcryptjs';
import {
  findUserByUsername,
  findUserByEmail,
  createUser,
} from '../../repositories/userRepository';
import { findRoleByName } from '../../repositories/roleRepository';
import { UserExistsError } from './errors';

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await findUserByUsername(username);
  const existingEmail = await findUserByEmail(email);

  if (existingUser || existingEmail) {
    throw new UserExistsError('Пользователь или email уже заняты');
  }

  if (password.length < 6) {
    throw new Error('Пароль должен содержать не менее 6 символов');
  }

  const password_hash = await bcrypt.hash(password, 10);
  const userRole = await findRoleByName('user');

  if (!userRole) {
    throw new Error('Роль "user" не найдена в базе данных');
  }

  const newUser = await createUser({
    username,
    email,
    password_hash,
    role: userRole,
  });

  return { message: 'Пользователь успешно зарегистрирован', user: newUser };
};
