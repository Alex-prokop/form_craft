import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log('API URL: ', apiUrl); // Временно выводим URL
    fetch(`${apiUrl}/api/message`)
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
