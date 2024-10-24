import { useState, useEffect, useCallback } from 'react';
import {
  fetchTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from '../api/templateApi';
import { Template } from '../types/templateTypes';

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTemplates();
      setTemplates(data);
    } catch {
      setError('Ошибка при загрузке шаблонов');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const addTemplate = useCallback(
    async (templateData: Omit<Template, 'id'>) => {
      try {
        // Добавляем пустой массив для questions, так как он ожидается в API
        const completeTemplateData = { ...templateData, questions: [] };
        const newTemplate = await createTemplate(completeTemplateData);
        setTemplates((prev) => [...prev, newTemplate]);
      } catch {
        setError('Ошибка при добавлении шаблона');
      }
    },
    []
  );

  const editTemplate = useCallback(
    async (id: number, updatedTemplate: Omit<Template, 'id'>) => {
      try {
        const editedTemplate = await updateTemplate(id, updatedTemplate);
        setTemplates((prev) =>
          prev.map((template) =>
            template.id === id ? { ...template, ...editedTemplate } : template
          )
        );
      } catch {
        setError('Ошибка при редактировании шаблона');
      }
    },
    []
  );

  const removeTemplate = useCallback(async (id: number) => {
    try {
      await deleteTemplate(id);
      setTemplates((prev) => prev.filter((template) => template.id !== id));
    } catch {
      setError('Ошибка при удалении шаблона');
    }
  }, []);

  return {
    templates,
    loading,
    error,
    addTemplate,
    editTemplate,
    removeTemplate,
  };
};
