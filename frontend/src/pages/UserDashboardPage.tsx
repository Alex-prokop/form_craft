// pages/UserDashboardPage.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import UserDashboardTabs from '../features/user/UserDashboardTabs';

const UserDashboardPage: React.FC = () => {
  return (
    <div>
      <UserDashboardTabs />
      {/* Компонент Outlet для рендеринга вложенных маршрутов */}
      <Outlet />
    </div>
  );
};

export default UserDashboardPage;
