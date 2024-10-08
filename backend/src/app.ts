import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';
import authRoutes from './routes/authRoutes';
import messageRoutes from './routes/messageRoutes';
import { corsMiddleware } from './middlewares/corsMiddleware';

const app = express();

app.use(corsMiddleware);
app.use(express.json());

// Подключение маршрутов:
app.use('/auth', authRoutes);
app.use('/api', messageRoutes);

// Подключение Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
