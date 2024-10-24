export const templateSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    authorId: { type: 'integer' },
    title: { type: 'string' },
    description: { type: 'string' },
    topicId: { type: 'integer' },
  },
};

export const templateSwagger = {
  '/api/templates': {
    get: {
      tags: ['Template'],
      summary: 'Получить все шаблоны',
      description: 'Возвращает список всех доступных шаблонов.',
      responses: {
        200: {
          description: 'Успешный запрос',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Template',
                },
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
      tags: ['Template'],
      summary: 'Создать новый шаблон',
      description: 'Создает новый шаблон на основе переданных данных.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: templateSchema,
          },
        },
      },
      responses: {
        201: {
          description: 'Шаблон успешно создан',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Template',
              },
            },
          },
        },
        400: {
          description: 'Некорректные данные',
        },
        404: {
          description: 'Автор или тема не найдены',
        },
        500: {
          description: 'Ошибка сервера',
        },
      },
    },
  },
  '/api/templates/{templateId}': {
    get: {
      tags: ['Template'],
      summary: 'Получить шаблон по ID',
      description: 'Возвращает шаблон по указанному идентификатору.',
      parameters: [
        {
          name: 'templateId',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
          },
          description: 'ID шаблона',
        },
      ],
      responses: {
        200: {
          description: 'Шаблон найден',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Template',
              },
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
  },
};
