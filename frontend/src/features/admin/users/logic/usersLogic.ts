import {
  getUsers,
  blockUser,
  unblockUser,
  changeUserRole,
  deleteUser,
  getUserById,
  updateUser,
} from '../api/usersApi';

const handleUserOperation = async <T>(
  operation: () => Promise<T>,
  errorMessage: string
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.error(errorMessage, error);
    throw error;
  }
};

export const fetchUsers = async () => {
  return handleUserOperation(
    getUsers,
    'Ошибка при получении списка пользователей'
  );
};

export const fetchUserById = async (id: number) => {
  return handleUserOperation(
    () => getUserById(id),
    'Ошибка при получении данных пользователя'
  );
};

export const modifyUser = async (id: number, userData: object) => {
  return handleUserOperation(
    () => updateUser(id, userData),
    'Ошибка при обновлении пользователя'
  );
};

export const removeUser = async (id: number) => {
  return handleUserOperation(
    () => deleteUser(id),
    'Ошибка при удалении пользователя'
  );
};

export const blockUserById = async (id: number) => {
  return handleUserOperation(
    () => blockUser(id),
    'Ошибка при блокировке пользователя'
  );
};

export const unblockUserById = async (id: number) => {
  return handleUserOperation(
    () => unblockUser(id),
    'Ошибка при разблокировке пользователя'
  );
};

export const makeAdmin = async (id: number) => {
  return handleUserOperation(
    () => changeUserRole(id, 'admin'),
    'Ошибка при назначении роли администратора'
  );
};

export const revokeAdmin = async (id: number) => {
  return handleUserOperation(
    () => changeUserRole(id, 'user'),
    'Ошибка при снятии роли администратора'
  );
};
