import React from 'react';
import { RouteObject } from 'react-router-dom';
import UserDashboardPage from '../pages/UserDashboardPage';
import UserTemplates from '../features/user/templates/ui/UserTemplates/TemplateManager';
import UserForms from '../features/user/forms/ui/UserForms';

export const userRoutes: RouteObject[] = [
  {
    path: '/user',
    element: <UserDashboardPage />,
    children: [
      { path: 'templates', element: <UserTemplates /> },
      { path: 'forms', element: <UserForms /> },
    ],
  },
];
