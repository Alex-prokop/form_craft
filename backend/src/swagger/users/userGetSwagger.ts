import { successResponse, errorResponses } from './userCommonSchemas';
export const userGetSwagger = {
  '/api/users': {
    get: {
      summary: 'Получение списка пользователей',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      responses: {
        ...successResponse,
        ...errorResponses,
      },
    },
  },
  '/api/users/{id}': {
    get: {
      summary: 'Получение пользователя по ID',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID пользователя',
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        ...successResponse,
        ...errorResponses,
      },
    },
  },
};
