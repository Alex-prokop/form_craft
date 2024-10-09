import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import TemplateCreatePage from '../pages/TemplateCreatePage';
import FormFillPage from '../pages/FormFillPage';
import FormResultsPage from '../pages/FormResultsPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/template/create" element={<TemplateCreatePage />} />
      <Route path="/form/:id" element={<FormFillPage />} />
      <Route path="/form/:id/results" element={<FormResultsPage />} />
    </Routes>
  );
};

export default AppRoutes;
