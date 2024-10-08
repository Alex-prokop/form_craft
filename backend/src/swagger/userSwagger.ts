export const userSwagger = {
  '/users': {
    get: {
      summary: 'Получение списка пользователей',
      tags: ['Users'],
      responses: {
        200: {
          description: 'Список пользователей',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
  },
};
