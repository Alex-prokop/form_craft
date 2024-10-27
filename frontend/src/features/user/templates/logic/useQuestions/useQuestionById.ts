import { useState, useCallback } from 'react';
import { fetchQuestionById } from '../../api/questionApi';
import { Question } from '../../types/templateTypes';

export const useQuestionById = (questionId: number) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuestionById = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchQuestionById(questionId);
      setQuestion(data || null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [questionId]);

  return { question, loading, error, loadQuestionById };
};
