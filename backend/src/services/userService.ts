import { AppDataSource } from '../config/ormconfig';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';

export const getAllUsers = async () => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.find();
};

export const getUserById = async (id: number) => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.findOneBy({ id });
};

export const updateUser = async (
  id: number,
  updates: { username?: string; email?: string; password?: string }
) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  user.username = updates.username || user.username;
  user.email = updates.email || user.email;

  if (updates.password) {
    user.password_hash = await bcrypt.hash(updates.password, 10);
  }

  return await userRepository.save(user);
};

export const deleteUser = async (id: number) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  return await userRepository.remove(user);
};
