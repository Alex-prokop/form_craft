import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';
import { corsMiddleware } from './middlewares/corsMiddleware';
import { errorHandler } from './middlewares/errorHandler';
import topicRoutes from './routes/topicRoutes';
import templateRoutes from './routes/templateRoutes';
import questionRoutes from './routes/questionRoutes';
import formRoutes from './routes/formRoutes';
import answerRoutes from './routes/answerRoutes';
import tagRoutes from './routes/tagRoutes';
import templateTagRoutes from './routes/templateTagRoutes';
import commentRoutes from './routes/commentRoutes';
import likeRoutes from './routes/likeRoutes';

const app = express();

app.use(corsMiddleware);
app.use(express.json());

// Подключение маршрутов:
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Подключение Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ---
app.use('/api', topicRoutes);
app.use('/api', templateRoutes);
app.use('/api', questionRoutes);
app.use('/api', formRoutes);
app.use('/api', answerRoutes);
app.use('/api', tagRoutes);
app.use('/api', templateTagRoutes);
app.use('/api', commentRoutes);
app.use('/api', likeRoutes);

app.use(errorHandler);

export default app;
