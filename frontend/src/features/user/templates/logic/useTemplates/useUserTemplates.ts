import { useState, useCallback, useEffect } from 'react';
import { fetchUserTemplates } from '../../api/templateApi';
import { Template } from '../../types/templateTypes';

export const useUserTemplates = () => {
  const [userTemplates, setUserTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadUserTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserTemplates();
      setUserTemplates(data);
    } catch (err) {
      setError('Ошибка при загрузке шаблонов пользователя');
    } finally {
      setLoading(false);
    }
  }, []);

  // Автоматическая загрузка шаблонов пользователя при монтировании
  useEffect(() => {
    loadUserTemplates();
  }, [loadUserTemplates]);

  return { userTemplates, loading, error, loadUserTemplates, setUserTemplates };
};
