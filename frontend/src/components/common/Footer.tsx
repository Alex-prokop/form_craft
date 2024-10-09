import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <footer
      className={`py-3 mt-auto ${
        theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-muted'
      }`}>
      <div className="container text-center">
        <span>{t('footer')}</span>
      </div>
    </footer>
  );
};

export default Footer;
