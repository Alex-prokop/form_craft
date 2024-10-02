import express from 'express';
import cors from 'cors';

const app = express();

// Используем переменные окружения для порта и доменов фронтенда
const port = process.env.PORT || 3001;

// Разрешенные источники (локальный и продакшн-домен)
const allowedOrigins = [
  'http://localhost:3000', // для локальной разработки
  'https://formcraft-production.up.railway.app', // ваш продакшн-домен
];

// Настраиваем CORS для разрешения запросов с этих доменов
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

app.get('/api/message', (req, res) => {
  res.json({ message: 'Привет от бэкенда!' });
});

app.listen(port, () => {
  console.log(
    `Бэкенд запущен на порту ${port}, доступ с разрешенных доменов: ${allowedOrigins.join(
      ', '
    )}`
  );
});
