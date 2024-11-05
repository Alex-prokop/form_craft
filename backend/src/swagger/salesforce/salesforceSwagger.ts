export const salesforceSwagger = {
  '/api/salesforce/account': {
    post: {
      tags: ['Salesforce'],
      summary: 'Создание Account и Contact в Salesforce',
      description:
        'Создает учетную запись (Account) и контакт (Contact) в Salesforce с использованием данных пользователя.',
      operationId: 'createSalesforceAccount',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  example: 'Test User',
                  description:
                    'Имя пользователя, которое будет использоваться в поле LastName для контакта.',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'test@example.com',
                  description: 'Электронная почта контакта.',
                },
                phone: {
                  type: 'string',
                  example: '1234567890',
                  description: 'Необязательное поле - телефон контакта.',
                },
              },
              required: ['username', 'email'],
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Account и Contact успешно созданы в Salesforce',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Account и Contact успешно созданы в Salesforce',
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Ошибка валидации данных',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Username и email обязательны',
                  },
                },
              },
            },
          },
        },
        '500': {
          description: 'Ошибка сервера при создании аккаунта в Salesforce',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Ошибка при создании аккаунта в Salesforce',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
