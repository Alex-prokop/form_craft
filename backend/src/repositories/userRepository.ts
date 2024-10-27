import { AppDataSource } from '../config/ormconfig';
import { User } from '../entities/User';
import { Role } from '../entities/Role';
import { UserNotFoundError, RoleNotFoundError } from '../errors/errors';

export const userRepository = AppDataSource.getRepository(User);
export const roleRepository = AppDataSource.getRepository(Role);

// Вспомогательная функция для поиска пользователя по критериям
const findUser = async (criteria: Partial<User>) => {
  return await userRepository.findOne({ where: criteria });
};

// Используется для проверки существования пользователя по имени при регистрации
export const findUserByUsername = async (username: string) => {
  const user = await userRepository.findOne({ where: { username } });
  return user; // Вернет null, если пользователь не найден
};

// Используется для проверки существования пользователя по email при регистрации
export const findUserByEmail = async (email: string) => {
  const user = await userRepository.findOne({ where: { email } });
  return user; // Вернет null, если пользователь не найден
};

// Создание нового пользователя
export const createUser = async (userData: Partial<User>) => {
  try {
    const newUser = userRepository.create(userData);
    return await userRepository.save(newUser);
  } catch (error) {
    console.error('Error in createUser:', error);
    throw new Error('Не удалось создать пользователя');
  }
};

// Получение пользователя с ролью по email
export const findUserWithRoleByEmail = async (email: string) => {
  const user = await userRepository.findOne({
    where: { email, is_deleted: false },
    relations: ['role'],
  });

  if (!user) {
    throw new UserNotFoundError(
      `Пользователь с email ${email} и ролью не найден`
    );
  }

  return user;
};

// Мягкое удаление пользователя
export const softDeleteUser = async (id: number) => {
  const user = await findUser({ id });

  if (!user) {
    throw new UserNotFoundError('Пользователь не найден');
  }

  user.is_deleted = true;
  return await userRepository.save(user);
};

// Блокировка пользователя
export const blockUser = async (id: number) => {
  const user = await findUser({ id });

  if (!user) {
    throw new UserNotFoundError('Пользователь не найден');
  }

  user.is_blocked = true;
  return await userRepository.save(user);
};

// Разблокировка пользователя
export const unblockUser = async (id: number) => {
  const user = await findUser({ id });

  if (!user) {
    throw new UserNotFoundError('Пользователь не найден');
  }

  user.is_blocked = false;
  return await userRepository.save(user);
};

// Поиск всех активных пользователей
export const findAllActiveUsers = async () => {
  return await userRepository.find({
    where: { is_deleted: false, is_blocked: false },
    relations: ['role'], // Загружаем связанные роли
  });
};

// Поиск активного пользователя по ID
export const findActiveUserById = async (id: number) => {
  const user = await findUser({ id, is_deleted: false, is_blocked: false });

  if (!user) {
    throw new UserNotFoundError('Активный пользователь не найден');
  }

  return user;
};

// Изменение роли пользователя
export const changeUserRole = async (userId: number, newRoleName: string) => {
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new UserNotFoundError('Пользователь не найден');
  }

  const role = await roleRepository.findOne({
    where: { role_name: newRoleName },
  });

  if (!role) {
    throw new RoleNotFoundError(`Роль "${newRoleName}" не найдена`);
  }

  user.role = role; // Обновляем роль пользователя
  return await userRepository.save(user);
};
