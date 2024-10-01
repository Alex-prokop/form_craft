import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

// Разрешаем запросы с фронтенда
app.use(cors());

app.get('/api/message', (req, res) => {
  res.json({ message: 'Привет от бэкенда!' });
});

app.listen(port, () => {
  console.log(`Бэкенд запущен на http://localhost:${port}`);
});
