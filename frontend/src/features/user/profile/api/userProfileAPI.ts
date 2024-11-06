import axios from 'axios';
import { UserProfileData, AccountContactData } from '../types/userProfileTypes';
import { API_URL } from '../../../../constants';

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Токен не найден');
  return {
    Authorization: `Bearer ${token}`,
  };
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
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || `Ошибка при запросе ${url}`
      );
    }
    throw new Error('Ошибка сети');
  }
};

export const fetchUserProfile = async (
  id: number
): Promise<UserProfileData | null> => {
  const profileData = await apiRequest<UserProfileData>(
    'get',
    `/api/users/${id}`
  );
  return profileData || null;
};

export const createSalesforceAccount = async (
  data: AccountContactData
): Promise<{ status: number; message: string }> => {
  try {
    const response = await axios.post(
      `${API_URL}/api/salesforce/account`,
      data,
      {
        headers: getAuthHeaders(),
      }
    );
    return { status: response.status, message: response.data.message };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          'Ошибка при создании аккаунта в Salesforce'
      );
    }
    throw new Error('Ошибка сети');
  }
};
