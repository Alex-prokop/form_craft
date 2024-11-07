// src/swagger/jira/userTicketsSwagger.ts
export const userTicketsSwagger = {
  '/api/jira/user-tickets': {
    get: {
      tags: ['Jira'],
      summary: 'Получение тикетов пользователя',
      description:
        'Возвращает список всех тикетов, созданных пользователем в Jira, с указанием статуса, приоритета и других данных.',
      responses: {
        '200': { description: 'Список тикетов успешно получен' },
        '400': { description: 'Ошибка: идентификатор пользователя не указан' },
        '500': { description: 'Ошибка сервера' },
      },
    },
  },
};
