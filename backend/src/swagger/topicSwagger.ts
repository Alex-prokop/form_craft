export const topicSwagger = {
  components: {
    schemas: {
      Topic: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          topic_name: { type: 'string' },
          is_deleted: { type: 'boolean' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      },
      TopicRequest: {
        type: 'object',
        properties: {
          topic_name: { type: 'string', example: 'Sample Topic' },
        },
        required: ['topic_name'],
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Error message' },
        },
      },
    },
  },
  '/api/topics': {
    get: {
      tags: ['Topics'],
      summary: 'Получить все темы',
      description: 'Возвращает список всех тем',
      responses: {
        200: {
          description: 'Успешный запрос',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Topic' },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['Topics'],
      summary: 'Создать новую тему',
      description: 'Создает новую тему с указанным именем',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/TopicRequest' },
          },
        },
      },
      responses: {
        201: {
          description: 'Тема успешно создана',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Topic' },
            },
          },
        },
        400: {
          description: 'Неверный запрос',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  '/api/topics/{id}': {
    get: {
      tags: ['Topics'],
      summary: 'Получить тему по ID',
      description: 'Возвращает тему по указанному ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          description: 'ID темы',
        },
      ],
      responses: {
        200: {
          description: 'Успешный запрос',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Topic' },
            },
          },
        },
        404: {
          description: 'Тема не найдена',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string', example: 'Topic not found' },
                },
              },
            },
          },
        },
      },
    },
  },
};
