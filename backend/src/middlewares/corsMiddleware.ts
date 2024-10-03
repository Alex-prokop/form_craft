import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000', //  локальная разработки
  process.env.FRONTEND_URL, //  продакшн-домен
];

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    console.log('Запрос с origin:', origin); // Логирование для диагностики
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
});
