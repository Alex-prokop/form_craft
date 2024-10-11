import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestComponent: React.FC = () => {
  const [message, setMessage] = useState('');
  const [dbMessage, setDbMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const apiUrl = 'http://localhost:5001';
    const apiUrl = import.meta.env.VITE_API_URL;

    console.log('API URL: ', apiUrl);

    if (!apiUrl) {
      console.error('VITE_API_URL не задан');
      setError('API URL не задан');
      setLoading(false);
      return;
    }

    // Запрос к маршруту message
    axios
      .get(`${apiUrl}/api/messages/message`)
      .then((response) => {
        console.log('Полученные данные:', response.data);
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
        setError(error.message);
      });

    // Запрос к маршруту test-db
    axios
      .get(`${apiUrl}/api/messages/test-db`)
      .then((response) => {
        console.log('Статус базы данных:', response.data);
        setDbMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Ошибка при подключении к базе данных:', error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h1>Загрузка...</h1>;
  }

  if (error) {
    return <h1>Ошибка: {error}</h1>;
  }

  return (
    <div>
      <h2>{message ? message : 'Нет сообщения'}</h2>
      <h2>
        {dbMessage ? dbMessage : 'Нет данных о подключении к базе данных'}
      </h2>
    </div>
  );
};

export default TestComponent;
