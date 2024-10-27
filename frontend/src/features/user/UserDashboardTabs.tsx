import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const UserDashboardTabs: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (path: string) => {
    setActiveTab(path);
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="/user/templates"
            className={`nav-link ${
              activeTab === '/user/templates' ? 'active' : ''
            }`}
            onClick={() => handleTabClick('/user/templates')}>
            Мои формы
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/user/forms"
            className={`nav-link ${
              activeTab === '/user/forms' ? 'active' : ''
            }`}
            onClick={() => handleTabClick('/user/forms')}>
            Мои заполненные формы
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserDashboardTabs;