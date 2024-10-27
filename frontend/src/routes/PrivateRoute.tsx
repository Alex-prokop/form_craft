import React, { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');

  // Проверка наличия токена
  return !!token && token !== 'undefined' && token !== 'null';
};

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  useEffect(() => {
    console.log('Проверка авторизации:', isAuthenticated());
  }, []);

  // Если авторизация успешна, отображаем элемент, иначе - редирект
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
