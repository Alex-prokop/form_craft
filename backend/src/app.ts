import express from 'express';
import { corsMiddleware } from './middlewares/corsMiddleware';
import messageRoutes from './routes/messageRoutes';

const app = express();

app.use(corsMiddleware);

// Подключение маршрутов:
app.use('/api', messageRoutes);

export default app;
