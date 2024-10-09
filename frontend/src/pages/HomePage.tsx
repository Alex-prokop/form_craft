import React from 'react';
import TestComponent from '../components/TestComponent';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Добро пожаловать на главную страницу!</h1>
      <TestComponent />
    </div>
  );
};

export default HomePage;
