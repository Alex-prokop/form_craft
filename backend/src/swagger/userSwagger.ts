export const userSwagger = {
  '/api/users': {
    get: {
      summary: 'Получение списка пользователей',
      tags: ['Users'],
      security: [{ bearerAuth: [] }], // Аутентификация по токену JWT
      responses: {
        200: {
          description: 'Список пользователей',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    username: { type: 'string' },
                    email: { type: 'string' },
                    role: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        role_name: { type: 'string' },
                      },
                    },
                    is_deleted: { type: 'boolean' },
                    is_blocked: { type: 'boolean' },
                    created_at: { type: 'string', format: 'date-time' },
                    updated_at: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
        403: {
          description: 'Доступ запрещен',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
  },
  '/api/users/{id}': {
    get: {
      summary: 'Получение пользователя по ID',
      tags: ['Users'],
      security: [{ bearerAuth: [] }], // Аутентификация по токену JWT
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
        200: {
          description: 'Информация о пользователе',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  username: { type: 'string' },
                  email: { type: 'string' },
                  role: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      role_name: { type: 'string' },
                    },
                  },
                  is_deleted: { type: 'boolean' },
                  is_blocked: { type: 'boolean' },
                  created_at: { type: 'string', format: 'date-time' },
                  updated_at: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
        403: {
          description: 'Доступ запрещен',
        },
        404: {
          description: 'Пользователь не найден',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
    put: {
      summary: 'Обновление данных пользователя',
      tags: ['Users'],
      security: [{ bearerAuth: [] }], // Аутентификация по токену JWT
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
        200: {
          description: 'Пользователь обновлен',
        },
        403: {
          description: 'Доступ запрещен',
        },
        404: {
          description: 'Пользователь не найден',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
    delete: {
      summary: 'Удаление пользователя',
      tags: ['Users'],
      security: [{ bearerAuth: [] }], // Аутентификация по токену JWT
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
        200: {
          description: 'Пользователь удален',
        },
        403: {
          description: 'Доступ запрещен',
        },
        404: {
          description: 'Пользователь не найден',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
  },
};
