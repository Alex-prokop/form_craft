import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import UserManagement from '../features/admin/users/ui/UserManagement';
import TemplateManagement from '../features/admin/templates/ui/TemplateManagement';
import FormReview from '../features/admin/forms/ui/FormReview';

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminDashboardPage />,
    children: [
      { path: 'users', element: <UserManagement /> },
      { path: 'templates', element: <TemplateManagement /> },
      { path: 'forms', element: <FormReview /> },
    ],
  },
];
