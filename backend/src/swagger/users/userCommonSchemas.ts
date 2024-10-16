export const userSchema = {
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
};

export const successResponse = {
  200: {
    description: 'Успешный ответ',
    content: {
      'application/json': {
        schema: userSchema,
      },
    },
  },
};

export const errorResponses = {
  403: {
    description: 'Доступ запрещен',
  },
  404: {
    description: 'Пользователь не найден',
  },
  500: {
    description: 'Ошибка сервера',
  },
};
