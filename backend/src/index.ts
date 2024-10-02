import express from 'express';
import cors from 'cors';

const app = express();

// Используем переменную окружения для порта и домена фронтенда
const port = process.env.PORT || 3001;
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';

// Настраиваем CORS для разрешения запросов
app.use(
  cors({
    origin: allowedOrigin,
  })
);

app.get('/api/message', (req, res) => {
  res.json({ message: 'Привет от бэкенда!' });
});

app.listen(port, () => {
  console.log(
    `Бэкенд запущен на порту ${port}, доступ с домена ${allowedOrigin}`
  );
});
