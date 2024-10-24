import axios from 'axios';
import { API_URL } from '../../../../constants';
import { Template } from '../types/templateTypes';

// Функция для получения заголовков с токеном авторизации
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

// Получение всех шаблонов
export const fetchTemplates = async (): Promise<Template[]> => {
  return apiRequest<Template[]>('get', '/api/templates') as Promise<Template[]>;
};

// Получение шаблона по ID
export const fetchTemplateById = async (id: number): Promise<Template> => {
  return apiRequest<Template>(
    'get',
    `/api/templates/${id}`
  ) as Promise<Template>;
};

// Создание нового шаблона
export const createTemplate = async (
  templateData: Omit<Template, 'id'>
): Promise<Template> => {
  return apiRequest<Template>(
    'post',
    '/api/templates',
    templateData
  ) as Promise<Template>;
};

// Обновление шаблона
export const updateTemplate = async (
  templateId: number,
  templateData: Omit<Template, 'id'>
): Promise<Template> => {
  return apiRequest<Template>(
    'put',
    `/api/templates/${templateId}`,
    templateData
  ) as Promise<Template>;
};

// Удаление шаблона
export const deleteTemplate = async (templateId: number): Promise<void> => {
  await apiRequest<void>('delete', `/api/templates/${templateId}`);
};
