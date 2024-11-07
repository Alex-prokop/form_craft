import { authSwagger } from './authSwagger';
import { userRoleSwagger } from './users/userRoleSwagger';
import { userGetSwagger } from './users/userGetSwagger';

import { userUpdateSwagger } from './users/userUpdateSwagger';
import { userBlockSwagger } from './users/userBlockSwagger';
import { userSchema } from './users/userCommonSchemas';

import { templateSwagger } from './templates/templateSwagger';
import { templateSchema } from './templates/templateSchema';
import { topicSwagger } from './topicSwagger';
import { questionSchema } from './questions/questionSchema';
import { questionSwagger } from './questions/questionSwagger';

import { salesforceSwagger } from './salesforce/salesforceSwagger';
import { jiraSwagger } from './jiraSwagger';

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
    ...salesforceSwagger,
    ...jiraSwagger,
  },
  components: {
    schemas: {
      User: userSchema,
      ...templateSchema,
      ...questionSchema,
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
