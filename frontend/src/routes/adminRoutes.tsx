import React from 'react';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import UserManagement from '../features/admin/users/ui/UserManagement';
import TemplateManagement from '../features/admin/templates/ui/TemplateManagement';
import FormReview from '../features/admin/forms/ui/FormReview';
import PrivateRoute from './PrivateRoute';

export const adminRoutes = [
  {
    path: '/admin',
    element: <PrivateRoute element={<AdminDashboardPage />} />,
    children: [
      { path: 'users', element: <PrivateRoute element={<UserManagement />} /> },
      {
        path: 'templates',
        element: <PrivateRoute element={<TemplateManagement />} />,
      },
      { path: 'forms', element: <PrivateRoute element={<FormReview />} /> },
    ],
  },
];
