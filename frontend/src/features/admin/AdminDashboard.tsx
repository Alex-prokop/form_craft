import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard: React.FC = () => {
  return (
    <div className="d-flex">
      {/* Боковая панель */}
      <nav className="admin-sidebar bg-light vh-100 p-3">
        <h4 className="mb-4">Админ-панель</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="users" className="nav-link">
              Управление пользователями
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="templates" className="nav-link">
              Редактирование шаблонов
            </Link>
          </li>
          <li className="nav-item">
            <Link to="forms" className="nav-link">
              Просмотр заполненных форм
            </Link>
          </li>
        </ul>
      </nav>

      {/* Основное содержимое */}
      <main className="admin-content p-4 flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
