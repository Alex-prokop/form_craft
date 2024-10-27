import { useCallback } from 'react';
import { updateTemplate } from '../../api/templateApi';
import { Template } from '../../types/templateTypes';

export const useEditTemplate = (
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
) => {
  const editTemplate = useCallback(
    async (
      id: number,
      updatedTemplate: Omit<Template, 'id'>
    ): Promise<Template> => {
      try {
        const editedTemplate = await updateTemplate(id, updatedTemplate);
        if (editedTemplate) {
          setTemplates((prev) =>
            prev.map((template) =>
              template.id === id ? { ...template, ...editedTemplate } : template
            )
          );
          return editedTemplate; // Возвращаем обновленный шаблон
        } else {
          throw new Error('Ошибка при обновлении шаблона');
        }
      } catch {
        throw new Error('Ошибка при редактировании шаблона');
      }
    },
    [setTemplates]
  );

  return { editTemplate };
};
