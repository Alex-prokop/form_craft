import { errorResponses } from './userCommonSchemas';

export const userBlockSwagger = {
  '/api/users/{id}/block': {
    post: {
      summary: 'Блокировка пользователя',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID пользователя для блокировки',
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        200: {
          description: 'Пользователь заблокирован',
        },
        ...errorResponses,
      },
    },
  },
  '/api/users/{id}/unblock': {
    post: {
      summary: 'Разблокировка пользователя',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID пользователя для разблокировки',
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        200: {
          description: 'Пользователь разблокирован',
        },
        ...errorResponses,
      },
    },
  },
};
