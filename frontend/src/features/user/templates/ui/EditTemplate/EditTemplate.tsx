import React, { useState, useEffect } from 'react';
import { useTemplates } from '../../logic/useTemplates';
import { Template } from '../../types/templateTypes';
import QuestionForm from '../CreateTemplate/QuestionForm/QuestionForm';

interface EditTemplateProps {
  templateId: number;
  onClose: () => void;
}

const EditTemplate: React.FC<EditTemplateProps> = ({ templateId, onClose }) => {
  const { templates, editTemplate } = useTemplates();
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    const currentTemplate = templates.find((tpl) => tpl.id === templateId);
    if (currentTemplate) setTemplate(currentTemplate);
  }, [templateId, templates]);

  const handleSave = async () => {
    if (template) {
      await editTemplate(template.id, template);
      onClose();
    }
  };

  if (!template) return <p>Шаблон не найден</p>;

  return (
    <div>
      <h3>Редактировать шаблон</h3>
      <input
        type="text"
        value={template.title}
        onChange={(e) => setTemplate({ ...template, title: e.target.value })}
      />
      <textarea
        value={template.description}
        onChange={(e) =>
          setTemplate({ ...template, description: e.target.value })
        }
      />
      <button onClick={handleSave}>Сохранить</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  );
};

export default EditTemplate;
