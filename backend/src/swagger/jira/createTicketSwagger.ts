// src/swagger/jira/createTicketSwagger.ts
export const createTicketSwagger = {
  '/api/jira/create-ticket': {
    post: {
      tags: ['Jira'],
      summary: 'Создание тикета в Jira',
      description:
        'Позволяет пользователю создать тикет в Jira с указанными параметрами. Тикет создается с типом задачи "Task".',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                summary: {
                  type: 'string',
                  description: 'Краткое описание тикета',
                  example: 'Ошибка при загрузке страницы',
                },
                priority: {
                  type: 'string',
                  description: 'Приоритет тикета (High, Average, Low)',
                  example: 'High',
                },
                template: {
                  type: 'string',
                  description: 'Название шаблона, если применимо',
                  example: 'User Feedback Template',
                },
                link: {
                  type: 'string',
                  description: 'Ссылка на страницу, с которой был вызван тикет',
                  example: 'https://example.com/page',
                },
              },
              required: ['summary', 'priority'],
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Тикет успешно создан',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Ticket created successfully',
                  },
                  ticketUrl: {
                    type: 'string',
                    example: 'https://formcraf.atlassian.net/browse/SR-1',
                  },
                },
              },
            },
          },
        },
        '400': { description: 'Ошибочный запрос, неверные данные' },
        '500': { description: 'Ошибка сервера' },
      },
    },
  },
};
