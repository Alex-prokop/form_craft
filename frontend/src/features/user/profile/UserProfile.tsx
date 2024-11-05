// features/user/profile/UserProfile.tsx
import React from 'react';
import UserProfileInfo from './ui/UserProfileInfo'; // Компонент для отображения информации о пользователе
import AccountContactForm from './ui/AccountContactForm'; // Компонент формы для создания Account и Contact

const UserProfile: React.FC = () => {
  return (
    <div>
      <h2>Профиль пользователя</h2>
      {/* Отображаем основную информацию о пользователе */}
      <UserProfileInfo />

      {/* Отображаем форму для создания Account и Contact */}
      <AccountContactForm />
    </div>
  );
};

export default UserProfile;
