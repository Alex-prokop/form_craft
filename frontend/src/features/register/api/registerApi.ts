// features/register/api/registerApi.ts
import axios from 'axios';
import { RegisterFormInputs } from '../types/RegisterFormInputs';

// const API_URL = 'https://formcraftbackend-production.up.railway.app';
const API_URL = 'http://localhost:5001/auth';

// const API_URL = 'http://localhost:5000/auth'; // базовый URL бэкенда

// Функция для регистрации пользователя
export const registerUser = async (data: RegisterFormInputs) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data; // Вернуть ответ сервера
  } catch (error) {
    // Обработка ошибок
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ошибка регистрации');
    }
    throw new Error('Ошибка сети');
  }
};
