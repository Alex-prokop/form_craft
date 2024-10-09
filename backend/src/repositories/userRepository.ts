import { AppDataSource } from '../config/ormconfig';
import { User } from '../entities/User';

export const userRepository = AppDataSource.getRepository(User);

export const findUserByUsername = async (username: string) => {
  return await userRepository.findOneBy({ username });
};

export const findUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({ email });
};

export const createUser = async (userData: Partial<User>) => {
  const newUser = userRepository.create(userData);
  return await userRepository.save(newUser);
};

export const findUserWithRoleByEmail = async (email: string) => {
  return await userRepository.findOne({
    where: { email },
    relations: ['role'], // Загрузка связанной роли
  });
};
