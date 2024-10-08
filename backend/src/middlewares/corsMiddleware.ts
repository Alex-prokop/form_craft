import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5001',
  process.env.FRONTEND_URL,
  process.env.BACKEND_URL,
];

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    console.log('Запрос с origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
});
