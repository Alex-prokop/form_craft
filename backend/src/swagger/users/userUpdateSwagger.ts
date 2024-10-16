import { successResponse, errorResponses } from './userCommonSchemas';

export const userUpdateSwagger = {
  '/api/users/{id}': {
    put: {
      summary: 'Обновление данных пользователя',
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
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        ...successResponse,
        ...errorResponses,
      },
    },
    delete: {
      summary: 'Удаление пользователя (мягкое удаление)',
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
