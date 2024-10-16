import { userSchema, errorResponses } from './userCommonSchemas';

export const userRoleSwagger = {
  '/api/users/{id}/role': {
    put: {
      summary: 'Изменение роли пользователя',
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
                newRole: {
                  type: 'string',
                  description: 'Новая роль для пользователя',
                },
              },
              example: {
                newRole: 'admin',
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Роль пользователя успешно обновлена',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  user: userSchema,
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
