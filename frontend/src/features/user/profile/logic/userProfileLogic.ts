// features/user/profile/logic/userProfileLogic.ts
import { AccountContactData } from '../types/userProfileTypes';

// Пример функции для валидации данных перед отправкой на сервер
export const validateAccountContactData = (
  data: AccountContactData
): boolean => {
  return !!data.name && !!data.email; // Простой пример валидации
};
