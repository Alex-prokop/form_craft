// Определение схемы вопроса
export const questionSchema = {
  Question: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      template_id: { type: 'integer' },
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
      show_in_results: { type: 'boolean' },
      question_order: { type: 'integer' },
      is_deleted: { type: 'boolean' },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' },
    },
  },
};

// Общие параметры для вопросов
const templateIdParam = {
  name: 'templateId',
  in: 'path',
  required: true,
  description: 'ID шаблона',
  schema: { type: 'integer' },
};

const questionIdParam = {
  name: 'questionId',
  in: 'path',
  required: true,
  description: 'ID вопроса',
  schema: { type: 'integer' },
};

// Роуты для вопросов
export const questionSwagger = {
  '/api/templates/{templateId}/questions': {
    get: {
      tags: ['Questions'],
      summary: 'Получить все вопросы для шаблона',
      parameters: [templateIdParam],
      responses: {
        200: {
          description: 'Успешное получение списка вопросов',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Question',
                },
              },
            },
          },
        },
        404: {
          description: 'Вопросы не найдены',
        },
      },
    },
    post: {
      tags: ['Questions'],
      summary: 'Создать новый вопрос для шаблона',
      parameters: [templateIdParam],
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
                show_in_results: { type: 'boolean', default: true },
                is_deleted: { type: 'boolean', default: false },
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
        400: {
          description: 'Ошибка валидации или недопустимый тип вопроса',
        },
        404: {
          description: 'Шаблон не найден',
        },
      },
    },
  },
  '/api/questions/{questionId}': {
    put: {
      tags: ['Questions'],
      summary: 'Обновить вопрос',
      parameters: [questionIdParam],
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
                is_deleted: { type: 'boolean' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Вопрос успешно обновлен',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Question' },
            },
          },
        },
        400: {
          description: 'Ошибка валидации или недопустимый тип вопроса',
        },
        404: {
          description: 'Вопрос не найден',
        },
      },
    },
    delete: {
      tags: ['Questions'],
      summary: 'Удалить вопрос',
      parameters: [questionIdParam],
      responses: {
        204: {
          description: 'Вопрос успешно удален',
        },
        404: {
          description: 'Вопрос не найден',
        },
      },
    },
  },
};
