import { useCallback } from 'react';
import { deleteTemplate } from '../../api/templateApi';
import { Template } from '../../types/templateTypes';

export const useRemoveTemplate = (
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
) => {
  const removeTemplate = useCallback(
    async (id: number) => {
      try {
        await deleteTemplate(id);
        setTemplates((prev) => prev.filter((template) => template.id !== id));
      } catch {
        throw new Error('Ошибка при удалении шаблона');
      }
    },
    [setTemplates]
  );

  return { removeTemplate };
};
