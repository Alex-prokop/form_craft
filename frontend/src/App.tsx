import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './tempComponents/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <Layout>
              <AppRoutes />
            </Layout>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
