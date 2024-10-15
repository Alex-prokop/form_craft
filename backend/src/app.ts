import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';
import { corsMiddleware } from './middlewares/corsMiddleware';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(corsMiddleware);
app.use(express.json());

// Подключение маршрутов:
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Подключение Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
