import axios from 'axios';
import { API_URL } from '../../../../constants';

// Получение списка пользователей
export const getUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Токен не найден');

    const response = await axios.get(`${API_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Обработка ошибок
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          'Ошибка при получении списка пользователей'
      );
    }
    throw new Error('Ошибка сети');
  }
};

// Получение пользователя по ID
export const getUserById = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Токен не найден');

    const response = await axios.get(`${API_URL}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Вернуть информацию о пользователе
  } catch (error) {
    // Обработка ошибок
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || 'Ошибка при получении пользователя'
      );
    }
    throw new Error('Ошибка сети');
  }
};

// Обновление данных пользователя
export const updateUser = async (id: number, userData: object) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Токен не найден');

    const response = await axios.put(`${API_URL}/api/users/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Обработка ошибок
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || 'Ошибка при обновлении пользователя'
      );
    }
    throw new Error('Ошибка сети');
  }
};

// Удаление пользователя
export const deleteUser = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Токен не найден');

    const response = await axios.delete(`${API_URL}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Обработка ошибок
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || 'Ошибка при удалении пользователя'
      );
    }
    throw new Error('Ошибка сети');
  }
};
