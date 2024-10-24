import axios from 'axios';
import { API_URL } from '../../../../constants';
import { Question } from '../types/templateTypes';

// Получение заголовков с токеном авторизации
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Токен не найден');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Обработка ошибок при запросе
const handleRequestError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error) && error.response) {
    throw new Error(error.response.data.message || defaultMessage);
  }
  throw new Error('Ошибка сети');
};

// Универсальная функция для API-запросов
const apiRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: unknown
): Promise<T | undefined> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      headers,
      data,
    });
    return response.data;
  } catch (error) {
    handleRequestError(
      error,
      `Ошибка при выполнении запроса ${method.toUpperCase()} ${url}`
    );
  }
  return undefined;
};

// Получение всех вопросов для шаблона
export const fetchQuestions = async (
  templateId: number
): Promise<Question[]> => {
  return apiRequest<Question[]>(
    'get',
    `/api/templates/${templateId}/questions`
  ) as Promise<Question[]>;
};

// Создание нового вопроса для шаблона
export const createQuestion = async (
  templateId: number,
  questionData: Omit<Question, 'id'>
): Promise<Question> => {
  return apiRequest<Question>(
    'post',
    `/api/templates/${templateId}/questions`,
    questionData
  ) as Promise<Question>;
};

// Обновление вопроса
export const updateQuestion = async (
  questionId: number,
  updatedData: Partial<Question>
): Promise<Question> => {
  return apiRequest<Question>(
    'put',
    `/api/questions/${questionId}`,
    updatedData
  ) as Promise<Question>;
};

// Удаление вопроса
export const deleteQuestion = async (questionId: number): Promise<void> => {
  await apiRequest<void>('delete', `/api/questions/${questionId}`);
};
