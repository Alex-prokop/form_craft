// src/swagger/jiraSwagger.ts
export const jiraSwagger = {
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
  '/api/auth/register': {
    post: {
      tags: ['Auth'],
      summary:
        'Регистрация нового пользователя и создание учетной записи в Jira',
      description:
        'Создает нового пользователя в базе данных приложения и отправляет запрос на создание учетной записи в Jira с указанными email и username.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  description: 'Имя пользователя',
                  example: 'new_user',
                },
                email: {
                  type: 'string',
                  description: 'Электронная почта пользователя',
                  example: 'user@example.com',
                },
                password: {
                  type: 'string',
                  description: 'Пароль пользователя',
                  example: 'securePassword123',
                },
              },
              required: ['username', 'email', 'password'],
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Пользователь успешно зарегистрирован и создан в Jira',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Пользователь успешно зарегистрирован',
                  },
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'number', example: 1 },
                      username: { type: 'string', example: 'new_user' },
                      email: { type: 'string', example: 'user@example.com' },
                    },
                  },
                  token: { type: 'string', example: 'jwt-token' },
                },
              },
            },
          },
        },
        '400': { description: 'Ошибочный запрос, неверные данные' },
        '500': { description: 'Ошибка сервера при создании учетной записи' },
      },
    },
  },
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
