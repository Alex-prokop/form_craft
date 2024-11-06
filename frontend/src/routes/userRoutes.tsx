// src/routes/userRoutes.tsx
import React from 'react';
import UserDashboardPage from '../pages/UserDashboardPage';
import TemplateManager from '../features/user/templates/ui/UserTemplates/TemplateManager';
import UserForms from '../features/user/forms/ui/UserForms';
import UserProfile from '../features/user/profile/UserProfile'; // Импортируем компонент профиля
import PrivateRoute from './PrivateRoute';

export const userRoutes = [
  {
    path: '/user',
    element: <PrivateRoute element={<UserDashboardPage />} />,
    children: [
      {
        path: 'templates',
        element: <PrivateRoute element={<TemplateManager />} />,
      },
      {
        path: 'forms',
        element: <PrivateRoute element={<UserForms />} />,
      },
      {
        path: 'profile', // Добавляем маршрут профиля
        element: <PrivateRoute element={<UserProfile />} />,
      },
    ],
  },
];
