export const templateSwagger = {
  '/api/templates': {
    get: {
      tags: ['Templates'],
      summary: 'Получение всех шаблонов',
      responses: {
        200: {
          description: 'Список шаблонов',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Template' },
              },
            },
          },
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
    post: {
      tags: ['Templates'],
      summary: 'Создание нового шаблона',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                topicId: { type: 'integer' },
              },
              required: ['title', 'topicId'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Шаблон успешно создан',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Template' },
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
  '/api/templates/user': {
    get: {
      tags: ['Templates'],
      summary: 'Получение шаблонов конкретного пользователя',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Список шаблонов пользователя',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Template' },
              },
            },
          },
        },
        401: {
          description: 'Пользователь не авторизован',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
  },
  '/api/templates/{templateId}': {
    get: {
      tags: ['Templates'],
      summary: 'Получение шаблона по ID',
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
          description: 'Информация о шаблоне',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Template' },
            },
          },
        },
        404: {
          description: 'Шаблон не найден',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
    put: {
      tags: ['Templates'],
      summary: 'Обновление шаблона',
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
                description: { type: 'string' },
                topicId: { type: 'integer' }, // Добавлено поле topicId
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Шаблон успешно обновлён',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Template' },
            },
          },
        },
        401: {
          description: 'Пользователь не авторизован',
        },
        404: {
          description: 'Шаблон не найден',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },

    delete: {
      tags: ['Templates'],
      summary: 'Логическое удаление шаблона',
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
        204: {
          description: 'Шаблон успешно удалён',
        },
        401: {
          description: 'Пользователь не авторизован',
        },
        404: {
          description: 'Шаблон не найден',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
  },
};
