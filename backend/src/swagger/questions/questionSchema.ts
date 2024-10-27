export const questionSchema = {
  Question: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      templateId: { type: 'integer' },
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
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' },
    },
  },
};
