import { authSwagger } from './authSwagger';
import { userSwagger } from './userSwagger';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
  paths: {
    ...authSwagger,
    ...userSwagger,
  },
  components: {
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
