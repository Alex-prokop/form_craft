import React, { useEffect, useState } from 'react';

const TestComponent: React.FC = () => {
  const [message, setMessage] = useState('');
  const [dbMessage, setDbMessage] = useState(''); // Для сообщения о статусе базы данных
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const apiUrl = 'http://localhost:5001';
    const apiUrl = 'https://formcraftbackend-production.up.railway.app';

    console.log('API URL: ', apiUrl);

    if (!apiUrl) {
      console.error('VITE_API_URL не задан');
      setError('API URL не задан');
      setLoading(false);
      return;
    }

    // Обновление пути к маршруту message
    fetch(`${apiUrl}/api/messages/message`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Полученные данные:', data);
        setMessage(data.message);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
        setError(error.message);
      });

    // Обновление пути к маршруту test-db
    fetch(`${apiUrl}/api/messages/test-db`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Статус базы данных:', data);
        setDbMessage(data.message);
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
