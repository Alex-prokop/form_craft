import { useCallback } from 'react';
import { createTemplate } from '../../api/templateApi';
import { Template } from '../../types/templateTypes';

export const useAddTemplate = (
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
) => {
  const addTemplate = useCallback(
    async (templateData: Omit<Template, 'id'>) => {
      try {
        const completeTemplateData = { ...templateData, questions: [] };
        const newTemplate = await createTemplate(completeTemplateData);

        // Проверка, если newTemplate определен
        if (newTemplate) {
          setTemplates((prev) => [...prev, newTemplate]);
        } else {
          console.error('Ошибка: новый шаблон не был создан');
        }
      } catch (error) {
        console.error('Ошибка при добавлении шаблона:', error);
        throw new Error('Ошибка при добавлении шаблона');
      }
    },
    [setTemplates]
  );

  return { addTemplate };
};
