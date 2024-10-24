import React from 'react';
import { useRoutes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TemplateCreatePage from '../pages/TemplateCreatePage';
import FormFillPage from '../pages/FormFillPage';
import FormResultsPage from '../pages/FormResultsPage';
import NotFoundPage from '../pages/NotFoundPage';
import ErrorPage from '../pages/ErrorPage';
import LoadingPage from '../pages/LoadingPage';

import { userRoutes } from './userRoutes';
import { adminRoutes } from './adminRoutes';

const AppRoutes: React.FC = () => {
  const routes = [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/template/create',
      element: <TemplateCreatePage />,
    },
    {
      path: '/form/:id',
      element: <FormFillPage />,
    },
    {
      path: '/form/:id/results',
      element: <FormResultsPage />,
    },
    {
      path: '/error',
      element: <ErrorPage />,
    },
    {
      path: '/loading',
      element: <LoadingPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
    // Встраиваем маршруты пользователя
    ...userRoutes,
    // Встраиваем маршруты администратора
    ...adminRoutes,
  ];

  const element = useRoutes(routes);
  return <>{element}</>;
};

export default AppRoutes;
