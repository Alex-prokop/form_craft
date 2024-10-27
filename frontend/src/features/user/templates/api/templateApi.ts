import axios from 'axios';
import { API_URL } from '../../../../constants';
import { Template } from '../types/templateTypes';

// Получение заголовков авторизации
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Токен не найден');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Обработка ошибок
const handleRequestError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error) && error.response) {
    console.error('Ошибка ответа:', error.response.data);
    throw new Error(error.response.data.message || defaultMessage);
  }
  console.error('Ошибка сети:', error);
  throw new Error('Ошибка сети');
};

// Обобщенная функция для выполнения API-запросов
const apiRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: unknown
): Promise<T | undefined> => {
  try {
    const headers = getAuthHeaders();
    console.log(`Отправка запроса: ${method.toUpperCase()} ${url}`);
    if (data) console.log('Данные запроса:', data);

    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      headers,
      data,
    });

    console.log('Ответ от сервера:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка запроса до обработки:', error);
    handleRequestError(
      error,
      `Ошибка при запросе ${method.toUpperCase()} ${url}`
    );
  }
  return undefined;
};

// Получение всех шаблонов
export const fetchTemplates = async (): Promise<Template[]> => {
  return (await apiRequest<Template[]>('get', '/api/templates')) || [];
};

// Получение шаблонов конкретного пользователя
export const fetchUserTemplates = async (): Promise<Template[]> => {
  return (await apiRequest<Template[]>('get', '/api/templates/user')) || [];
};

// Получение шаблона по ID
export const fetchTemplateById = async (
  id: number
): Promise<Template | undefined> => {
  return await apiRequest<Template>('get', `/api/templates/${id}`);
};

// Создание нового шаблона
export const createTemplate = async (
  templateData: Omit<Template, 'id'>
): Promise<Template | undefined> => {
  return await apiRequest<Template>('post', '/api/templates', templateData);
};

// Обновление шаблона
export const updateTemplate = async (
  templateId: number,
  templateData: Partial<Omit<Template, 'id'>>
): Promise<Template | undefined> => {
  return await apiRequest<Template>(
    'put',
    `/api/templates/${templateId}`,
    templateData
  );
};

// Удаление шаблона
export const deleteTemplate = async (templateId: number): Promise<void> => {
  await apiRequest<void>('delete', `/api/templates/${templateId}`);
};
