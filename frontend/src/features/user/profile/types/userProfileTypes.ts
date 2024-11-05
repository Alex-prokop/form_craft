// features/user/profile/types/userProfileTypes.ts

// Типы данных профиля пользователя
export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// Типы данных для формы создания Account и Contact
export interface AccountContactData {
  name: string;
  email: string;
  phone?: string;
}
