// features/register/Register.tsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { RegisterForm } from './ui/RegisterForm';

const Register: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`container mt-5 ${
        theme === 'dark' ? 'text-light bg-dark' : 'text-dark bg-light'
      }`}>
      <h1 className="text-center mb-4">Register</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
