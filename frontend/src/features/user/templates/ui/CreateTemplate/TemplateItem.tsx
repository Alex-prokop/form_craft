import React from 'react';
import { Template } from '../../types/templateTypes';

interface TemplateItemProps {
  template: Template;
  onEdit: (templateId: number) => void;
  onDelete: (templateId: number) => void;
  onAddQuestions: (templateId: number) => void;
}

const TemplateItem: React.FC<TemplateItemProps> = ({
  template,
  onEdit,
  onDelete,
  onAddQuestions,
}) => (
  <div className="list-group-item mb-3">
    <h5>{template.title}</h5>
    <p>{template.description}</p>
    <p>
      <strong>Тема:</strong>{' '}
      {template.topic ? template.topic.topic_name : 'Тема не указана'}
    </p>
    <button
      className="btn btn-secondary me-2"
      onClick={() => onEdit(template.id)}>
      Редактировать
    </button>
    <button
      className="btn btn-danger me-2"
      onClick={() => onDelete(template.id)}>
      Удалить
    </button>
    <button
      className="btn btn-primary"
      onClick={() => onAddQuestions(template.id)}>
      Добавить вопросы
    </button>
  </div>
);

export default TemplateItem;
