export const questionSwagger = {
  '/api/templates/{templateId}/questions': {
    get: {
      tags: ['Questions'],
      summary: 'Получение вопросов по шаблону',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'templateId',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'ID шаблона',
        },
      ],
      responses: {
        200: {
          description: 'Список вопросов для шаблона',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Question' },
              },
            },
          },
        },
        401: {
          description: 'Пользователь не авторизован',
        },
        404: {
          description: 'Вопросы не найдены',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
    post: {
      tags: ['Questions'],
      summary: 'Создание нового вопроса',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'templateId',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'ID шаблона',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                question_type: {
                  type: 'string',
                  enum: [
                    'single_line_string',
                    'multi_line_text',
                    'positive_integer',
                    'checkbox',
                  ],
                },
                description: { type: 'string' },
                question_order: { type: 'integer' },
                show_in_results: { type: 'boolean' },
              },
              required: ['title', 'question_type', 'question_order'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Вопрос успешно создан',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Question' },
            },
          },
        },
        401: {
          description: 'Пользователь не авторизован',
        },
        400: {
          description: 'Некорректные данные',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
  },
  '/api/questions/{questionId}': {
    get: {
      tags: ['Questions'],
      summary: 'Получение вопроса по ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'questionId',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'ID вопроса',
        },
      ],
      responses: {
        200: {
          description: 'Информация о вопросе',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Question' },
            },
          },
        },
        401: {
          description: 'Пользователь не авторизован',
        },
        404: {
          description: 'Вопрос не найден',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
    put: {
      tags: ['Questions'],
      summary: 'Обновление вопроса',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'questionId',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'ID вопроса',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                question_type: {
                  type: 'string',
                  enum: [
                    'single_line_string',
                    'multi_line_text',
                    'positive_integer',
                    'checkbox',
                  ],
                },
                description: { type: 'string' },
                question_order: { type: 'integer' },
                show_in_results: { type: 'boolean' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Вопрос успешно обновлён',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Question' },
            },
          },
        },
        401: {
          description: 'Пользователь не авторизован',
        },
        404: {
          description: 'Вопрос не найден',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
    delete: {
      tags: ['Questions'],
      summary: 'Удаление вопроса',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'questionId',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'ID вопроса',
        },
      ],
      responses: {
        204: {
          description: 'Вопрос успешно удалён',
        },
        401: {
          description: 'Пользователь не авторизован',
        },
        404: {
          description: 'Вопрос не найден',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
  },
};
