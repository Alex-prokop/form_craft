export const templateSchema = {
  Template: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      authorId: { type: 'integer' },
      title: { type: 'string' },
      description: { type: 'string' },
      topic: {
        type: 'object',
        properties: {
          topic_id: { type: 'integer' },
          topic_name: { type: 'string' },
        },
      },
      is_deleted: { type: 'boolean' },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' },
    },
  },
};
