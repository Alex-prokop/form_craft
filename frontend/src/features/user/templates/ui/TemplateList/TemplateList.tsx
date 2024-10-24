import React, { useState } from 'react';
import { useTemplates } from '../../logic/useTemplates';
import EditTemplate from '../EditTemplate/EditTemplate';
import QuestionCreationModal from '../CreateTemplate/QuestionCreationModal';
import { Question } from '../../types/templateTypes'; // Импортируем тип Question

const TemplateList: React.FC = () => {
  const { templates, loading, error, removeTemplate } = useTemplates();
  const [editingTemplateId, setEditingTemplateId] = useState<number | null>(
    null
  );
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const handleAddQuestion = (newQuestion: Omit<Question, 'id'>) => {
    // Логика добавления нового вопроса
    console.log('Новый вопрос добавлен:', newQuestion);
  };

  if (loading) return <p>Загрузка шаблонов...</p>;
  if (error) return <p>Ошибка загрузки: {error}</p>;

  return (
    <div>
      {editingTemplateId ? (
        <EditTemplate
          templateId={editingTemplateId}
          onClose={() => setEditingTemplateId(null)}
        />
      ) : (
        templates.map((template) => (
          <div key={template.id} className="template-item mb-3">
            <h3>{template.title}</h3>
            <button
              className="btn btn-secondary me-2"
              onClick={() => setEditingTemplateId(template.id)}>
              Редактировать
            </button>
            <button
              className="btn btn-danger"
              onClick={() => removeTemplate(template.id)}>
              Удалить
            </button>
          </div>
        ))
      )}
      {showQuestionModal && (
        <QuestionCreationModal
          show={showQuestionModal}
          onClose={() => setShowQuestionModal(false)}
          onAdd={handleAddQuestion}
        />
      )}
    </div>
  );
};

export default TemplateList;
