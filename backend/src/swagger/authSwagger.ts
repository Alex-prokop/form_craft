export const authSwagger = {
  '/auth/register': {
    post: {
      summary: 'Регистрация нового пользователя',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['username', 'email', 'password'],
              properties: {
                username: { type: 'string' },
                email: { type: 'string', format: 'email' },
                password: { type: 'string', format: 'password' },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Пользователь успешно зарегистрирован',
        },
        400: {
          description: 'Ошибка валидации или пользователь уже существует',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
  },
  '/auth/login': {
    post: {
      summary: 'Вход пользователя',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string', format: 'password' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Успешная аутентификация',
        },
        400: {
          description: 'Неверный email или пароль',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
  },
};
