import { authSwagger } from './authSwagger';
import { userRoleSwagger } from './users/userRoleSwagger';
import { userGetSwagger } from './users/userGetSwagger';
import { userUpdateSwagger } from './users/userUpdateSwagger';
import { userBlockSwagger } from './users/userBlockSwagger';

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
