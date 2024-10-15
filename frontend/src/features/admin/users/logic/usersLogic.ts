import { getUsers, getUserById, updateUser, deleteUser } from '../api/usersApi';

// Получение списка пользователей с обработкой ошибок
export const fetchUsers = async () => {
  try {
    const users = await getUsers();
    return users;
  } catch (error) {
    console.error('Ошибка при получении списка пользователей:', error);
    throw error;
  }
};

// Получение данных пользователя по ID
export const fetchUserById = async (id: number) => {
  try {
    const user = await getUserById(id);
    return user;
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    throw error;
  }
};

// Обновление пользователя
export const modifyUser = async (id: number, userData: object) => {
  try {
    const updatedUser = await updateUser(id, userData);
    return updatedUser;
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    throw error;
  }
};

// Удаление пользователя
export const removeUser = async (id: number) => {
  try {
    const result = await deleteUser(id);
    return result;
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    throw error;
  }
};
