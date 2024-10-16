import axios from 'axios';
import { API_URL } from '../../../../constants';
import { User } from '../types/userTypes';

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

export const getUsers = async (): Promise<User[]> => {
  return apiRequest<User[]>('get', '/api/users') as Promise<User[]>;
};

export const getUserById = async (id: number): Promise<User> => {
  return apiRequest<User>('get', `/api/users/${id}`) as Promise<User>;
};

export const updateUser = async (
  id: number,
  userData: Partial<User>
): Promise<User> => {
  return apiRequest<User>('put', `/api/users/${id}`, userData) as Promise<User>;
};

export const deleteUser = async (id: number): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(
    'delete',
    `/api/users/${id}`
  ) as Promise<{ message: string }>;
};

export const blockUser = async (id: number): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(
    'post',
    `/api/users/${id}/block`
  ) as Promise<{ message: string }>;
};

export const unblockUser = async (id: number): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(
    'post',
    `/api/users/${id}/unblock`
  ) as Promise<{ message: string }>;
};

export const changeUserRole = async (
  id: number,
  newRole: string
): Promise<User> => {
  return apiRequest<User>('put', `/api/users/${id}/role`, {
    newRole,
  }) as Promise<User>;
};

export const removeAdmin = async (id: number): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(
    'post',
    `/api/users/${id}/remove-admin`
  ) as Promise<{ message: string }>;
};
