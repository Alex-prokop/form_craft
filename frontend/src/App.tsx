import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Для отслеживания состояния загрузки
  const [error, setError] = useState<string | null>(null); // Исправление типизации для error

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log('API URL: ', apiUrl); // Выводим API URL

    // Проверяем, задан ли URL
    if (!apiUrl) {
      console.error('VITE_API_URL не задан');
      setError('API URL не задан');
      setLoading(false);
      return;
    }

    // Начинаем выполнение запроса
    console.log('Отправка запроса на:', `${apiUrl}/api/message`);

    fetch(`${apiUrl}/api/message`)
      .then((response) => {
        // Проверяем статус ответа
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Полученные данные:', data); // Логируем полученные данные
        setMessage(data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error); // Логируем ошибки
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Показываем разные состояния в зависимости от загрузки и ошибок
  if (loading) {
    return <h1>Загрузка...</h1>;
  }

  if (error) {
    return <h1>Ошибка: {error}</h1>;
  }

  return (
    <div>
      <h1>{message ? message : 'Нет сообщения'}</h1>
    </div>
  );
}

export default App;
