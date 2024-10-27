import { useLoadTemplates } from './useTemplates/useLoadTemplates';
import { useAddTemplate } from './useTemplates/useAddTemplate';
import { useEditTemplate } from './useTemplates/useEditTemplate';
import { useRemoveTemplate } from './useTemplates/useRemoveTemplate';
import { useUserTemplates } from './useTemplates/useUserTemplates';
import { useTemplateById } from './useTemplates/useTemplateById';
import { Template } from '../types/templateTypes';
import { useCallback } from 'react';

export const useTemplates = () => {
  const { templates, loading, error, loadTemplates, setTemplates } =
    useLoadTemplates();
  const { userTemplates, loadUserTemplates } = useUserTemplates();
  const { addTemplate } = useAddTemplate(setTemplates);
  const { editTemplate } = useEditTemplate(setTemplates);
  const { removeTemplate } = useRemoveTemplate(setTemplates);

  const getTemplateById = useCallback((templateId: number) => {
    return useTemplateById(templateId);
  }, []);

  return {
    templates,
    userTemplates,
    loading,
    error,
    loadTemplates,
    loadUserTemplates,
    addTemplate,
    editTemplate,
    removeTemplate,
    getTemplateById,
  };
};
