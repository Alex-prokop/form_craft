import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg ${
          theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
        }`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {t('welcome')}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={toggleTheme}>
                  {theme === 'light' ? t('switchTheme') : t('switchTheme')}
                </button>
              </li>
              <li className="nav-item">
                <LanguageSwitcher />
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  {t('home')}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  {t('login')}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  {t('register')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
