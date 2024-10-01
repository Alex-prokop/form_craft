import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Запрос к бэкенду
    fetch('http://localhost:3001/api/message')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Ошибка:', error));
  }, []);

  return (
    <div>
      <h1>{message ? message : 'Загрузка...'}</h1>
    </div>
  );
}

export default App;
