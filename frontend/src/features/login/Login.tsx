import React from 'react';
import { LoginForm } from './ui/LoginForm';
import { useTheme } from '../../context/ThemeContext';

const Login: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`container mt-5 ${
        theme === 'dark' ? 'text-light bg-dark' : 'text-dark bg-light'
      }`}>
      <h1 className="text-center mb-4">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
