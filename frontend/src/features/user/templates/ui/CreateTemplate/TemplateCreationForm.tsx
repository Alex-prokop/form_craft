import React, { useState } from 'react';
import { useTemplates } from '../../logic/useTemplates';
import TemplateHeader from './TemplateHeader';
import SaveCancelButtons from './SaveCancelButtons';

const TemplateCreationForm: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');

  const { addTemplate } = useTemplates();

  const handleSubmit = async () => {
    if (!title || !topic) {
      alert('Название и тема обязательны.');
      return;
    }

    const newTemplateData = { title, description, topic };

    try {
      await addTemplate(newTemplateData);
      alert('Шаблон успешно создан');
      onClose();
    } catch {
      alert('Ошибка при создании шаблона');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Создать новый шаблон</h3>
      <TemplateHeader
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        topic={topic}
        setTopic={setTopic}
      />
      <SaveCancelButtons handleSubmit={handleSubmit} handleCancel={onClose} />
    </div>
  );
};

export default TemplateCreationForm;
