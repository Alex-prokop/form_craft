import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="nav-item">
      <select
        className="form-select"
        onChange={(e) => changeLanguage(e.target.value)}
        defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="ru">Русский</option>
        {/* Добавь больше языков по необходимости */}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
