// features/user/profile/api/userProfileAPI.ts
import axios from 'axios';
import { UserProfileData, AccountContactData } from '../types/userProfileTypes';

// Функция для получения информации о профиле пользователя
export const fetchUserProfile = async (): Promise<UserProfileData> => {
  const response = await axios.get('/api/user/profile');
  return response.data;
};

// Функция для создания Account и Contact
export const createAccountAndContact = async (
  data: AccountContactData
): Promise<void> => {
  await axios.post('/api/salesforce/account-contact', data);
};
