import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../../repositories/userRepository';
import { findRoleByName } from '../../repositories/roleRepository';
import { UserExistsError } from '../../errors/errors';

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new UserExistsError('Пользователь с таким email уже существует');
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
