import axios from 'axios';
import { API_URL } from '../../../../constants';
import { Topic } from '../types/topicTypes';

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Токен не найден');
  return {
    Authorization: `Bearer ${token}`,
  };
};

const handleRequestError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error) && error.response) {
    throw new Error(error.response.data.message || defaultMessage);
  }
  throw new Error('Ошибка сети');
};

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

// Получение всех тем
export const fetchTopics = async (): Promise<Topic[]> => {
  return apiRequest<Topic[]>('get', '/api/topics') as Promise<Topic[]>;
};

// Получение темы по ID
export const fetchTopicById = async (id: number): Promise<Topic> => {
  return apiRequest<Topic>('get', `/api/topics/${id}`) as Promise<Topic>;
};

// Создание новой темы
export const createTopic = async (topic_name: string): Promise<Topic> => {
  return apiRequest<Topic>('post', '/api/topics', {
    topic_name,
  }) as Promise<Topic>;
};
