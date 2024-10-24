import { authSwagger } from './authSwagger';
import { userRoleSwagger } from './users/userRoleSwagger';
import { userGetSwagger } from './users/userGetSwagger';
import { userUpdateSwagger } from './users/userUpdateSwagger';
import { userBlockSwagger } from './users/userBlockSwagger';
import { templateSwagger } from './templateSwagger';
import { topicSwagger } from './topicSwagger';
import { questionSwagger, questionSchema } from './questionSwagger';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
  paths: {
    ...authSwagger,
    ...userBlockSwagger,
    ...userRoleSwagger,
    ...userGetSwagger,
    ...userUpdateSwagger,
    ...templateSwagger,
    ...topicSwagger,
    ...questionSwagger,
  },
  components: {
    schemas: {
      ...questionSchema, // Подключение схемы для вопросов
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};
