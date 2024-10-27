import { useState, useCallback } from 'react';
import { fetchQuestionsByTemplate } from '../../api/questionApi';
import { Question } from '../../types/templateTypes';

// Хук для загрузки вопросов
export const useLoadQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = useCallback(
    async (templateId: number): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const data: Question[] = await fetchQuestionsByTemplate(templateId);
        setQuestions(data || []); // Устанавливаем пустой массив, если data равен null/undefined
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { questions, loading, error, loadQuestions, setQuestions };
};
