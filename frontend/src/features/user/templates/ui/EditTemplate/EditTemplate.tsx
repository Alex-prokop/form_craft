import React, { useState, useEffect } from 'react';
import { useTemplates } from '../../logic/useTemplates';
import { Template } from '../../types/templateTypes';
import TemplateHeader from '../CreateTemplate/TemplateHeader';

interface EditTemplateProps {
  templateId: number;
  onClose: () => void;
  onSave: (updatedTemplate: Template) => void;
}

const EditTemplate: React.FC<EditTemplateProps> = ({
  templateId,
  onClose,
  onSave,
}) => {
  const { getTemplateById, editTemplate, loadUserTemplates } = useTemplates();
  const { template, loading, error, loadTemplateById } =
    getTemplateById(templateId);

  const [localTemplate, setLocalTemplate] = useState<Template | null>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!template) {
      loadTemplateById();
    } else {
      setLocalTemplate(template);
    }
  }, [template, templateId, loadTemplateById]);

  const handleSave = async () => {
    if (localTemplate) {
      setSaveLoading(true);
      setSaveError(null);
      try {
        const updatedTemplate = await editTemplate(
          localTemplate.id,
          localTemplate
        );
        onSave(updatedTemplate); // Передача обновленного шаблона в родительский компонент
        await loadUserTemplates(); // Повторная загрузка шаблонов пользователя
        onClose(); // Закрытие модального окна после успешного редактирования
      } catch (err) {
        setSaveError('Ошибка при сохранении шаблона');
      } finally {
        setSaveLoading(false);
      }
    }
  };

  const handleTitleChange = (title: string) => {
    setLocalTemplate((prev) => (prev ? { ...prev, title } : null));
  };

  const handleDescriptionChange = (description: string) => {
    setLocalTemplate((prev) => (prev ? { ...prev, description } : null));
  };

  const handleTopicChange = (topicId: number) => {
    setLocalTemplate((prev) => (prev ? { ...prev, topicId } : null));
  };

  if (loading) return <p>Загрузка шаблона...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!localTemplate) return <p>Шаблон не найден</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Редактировать шаблон</h3>

      <TemplateHeader
        title={localTemplate.title}
        description={localTemplate.description}
        setTitle={handleTitleChange}
        setDescription={handleDescriptionChange}
        topicId={localTemplate.topicId || null}
        setTopicId={handleTopicChange}
      />

      {saveError && <p className="text-danger mt-3">{saveError}</p>}

      <div className="mt-4 d-flex justify-content-end">
        <button
          className="btn btn-secondary me-2"
          onClick={onClose}
          disabled={saveLoading}>
          Отмена
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saveLoading}>
          {saveLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </div>
  );
};

export default EditTemplate;
