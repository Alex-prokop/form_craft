import { successResponse, errorResponses } from './userCommonSchemas';

export const userGetSwagger = {
  '/api/users': {
    get: {
      summary: 'Получение списка пользователей',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Список пользователей',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
        ...errorResponses,
      },
    },
  },
};
