import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/ormconfig';
import { User } from '../entities/User';
import { Role } from '../entities/Role';
import { generateJwtToken } from '../utils/jwtUtils';

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const roleRepository = AppDataSource.getRepository(Role);

  const existingUser = await userRepository.findOneBy({ username });
  const existingEmail = await userRepository.findOneBy({ email });

  if (existingUser || existingEmail) {
    throw new Error('Пользователь или email уже заняты');
  }

  if (password.length < 6) {
    throw new Error('Пароль должен содержать не менее 6 символов');
  }

  const password_hash = await bcrypt.hash(password, 10);
  const userRole = await roleRepository.findOneBy({ role_name: 'user' });

  console.log('Найденная роль:', userRole);
  if (!userRole) {
    throw new Error('Роль "user" не найдена в базе данных');
  }

  const newUser = userRepository.create({
    username,
    email,
    password_hash,
    role: userRole,
  });

  await userRepository.save(newUser);

  return { message: 'Пользователь успешно зарегистрирован', user: newUser };
};

export const login = async (email: string, password: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { email },
    relations: ['role'],
  });

  if (!user) {
    throw new Error('Неверный email или пароль');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new Error('Неверный email или пароль');
  }

  if (!user.role) {
    throw new Error('Роль пользователя не найдена');
  }

  const token = generateJwtToken(user.id, user.username, user.role.role_name);
  return { message: 'Аутентификация успешна', token };
};
