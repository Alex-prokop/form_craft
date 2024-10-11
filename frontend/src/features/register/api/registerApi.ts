import axios from 'axios';
import { RegisterFormInputs } from '../types/RegisterFormInputs';
import { API_URL } from '../../../constants';

export const registerUser = async (data: RegisterFormInputs) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data; // Вернуть ответ сервера
  } catch (error) {
    // Обработка ошибок
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ошибка регистрации');
    }
    throw new Error('Ошибка сети');
  }
};
