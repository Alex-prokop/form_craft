import { useState, useCallback } from 'react';
import { fetchTemplates } from '../../api/templateApi';
import { Template } from '../../types/templateTypes';

export const useLoadTemplates = () => {
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

  return { templates, loading, error, loadTemplates, setTemplates };
};
