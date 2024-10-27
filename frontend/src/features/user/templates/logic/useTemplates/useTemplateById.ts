import { useState, useCallback, useEffect } from 'react'; // Импорт хуков
import { fetchTemplateById } from '../../api/templateApi'; // Импорт API-функции
import { Template } from '../../types/templateTypes'; // Импорт типа Template

export const useTemplateById = (templateId: number) => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadTemplateById = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log(`Загрузка шаблона по ID: ${templateId}`);
    try {
      const data = await fetchTemplateById(templateId);
      console.log('Полученные данные:', data);
      if (data) {
        setTemplate(data);
      } else {
        setError('Шаблон не найден');
      }
    } catch (err) {
      console.error('Ошибка при загрузке шаблона:', err);
      setError('Ошибка при загрузке шаблона');
    } finally {
      setLoading(false);
    }
  }, [templateId]);

  useEffect(() => {
    if (templateId) {
      loadTemplateById();
    }
  }, [templateId, loadTemplateById]);

  return { template, loading, error, loadTemplateById };
};
