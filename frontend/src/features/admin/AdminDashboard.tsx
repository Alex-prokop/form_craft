import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (path: string) => {
    setActiveTab(path);
  };

  return (
    <div>
      {/* Навигация с табами */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="users"
            className={`nav-link ${activeTab === '/users' ? 'active' : ''}`}
            onClick={() => handleTabClick('/users')}
          >
            Управление пользователями
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="templates"
            className={`nav-link ${activeTab === '/templates' ? 'active' : ''}`}
            onClick={() => handleTabClick('/templates')}
          >
            Редактирование шаблонов
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="forms"
            className={`nav-link ${activeTab === '/forms' ? 'active' : ''}`}
            onClick={() => handleTabClick('/forms')}
          >
            Просмотр заполненных форм
          </Link>
        </li>
      </ul>

      {/* Основное содержимое */}
      <main className="admin-content p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
