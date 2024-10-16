import {
  findAllActiveUsers,
  findActiveUserById,
  softDeleteUser,
  blockUser,
  unblockUser,
  userRepository,
  changeUserRole,
} from '../repositories/userRepository';
import bcrypt from 'bcryptjs';

// Получение всех активных пользователей (не удалённых и не заблокированных)
export const getAllUsersService = async () => {
  return await findAllActiveUsers();
};

// Получение активного пользователя по ID (не удалённого и не заблокированного)
export const getUserByIdService = async (id: number) => {
  return await findActiveUserById(id);
};

// Обновление данных пользователя
export const updateUserService = async (
  id: number,
  updates: { username?: string; email?: string; password?: string }
) => {
  const user = await findActiveUserById(id); // Ищем только активного пользователя

  if (updates.username) {
    user.username = updates.username;
  }

  if (updates.email) {
    user.email = updates.email;
  }

  if (updates.password) {
    user.password_hash = await bcrypt.hash(updates.password, 10);
  }

  return await userRepository.save(user); // Сохраняем изменения через userRepository
};

// Мягкое удаление пользователя (логическое удаление)
export const deleteUserService = async (id: number) => {
  return await softDeleteUser(id); // Используем мягкое удаление
};

// Блокировка пользователя
export const blockUserService = async (id: number) => {
  return await blockUser(id);
};

// Разблокировка пользователя
export const unblockUserService = async (id: number) => {
  return await unblockUser(id);
};

// Сервис для изменения роли пользователя
export const changeUserRoleService = async (
  userId: number,
  newRoleName: string
) => {
  return await changeUserRole(userId, newRoleName);
};
