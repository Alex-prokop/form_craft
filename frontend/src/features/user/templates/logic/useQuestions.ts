import { useState } from 'react';
import {
  fetchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../api/questionApi';
import { Question } from '../types/templateTypes';

export const useQuestions = (templateId: number | null) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = async () => {
    if (!templateId) return;
    setLoading(true);
    setError(null);

    try {
      const fetchedQuestions = await fetchQuestions(templateId);
      setQuestions(fetchedQuestions);
    } catch {
      setError('Ошибка при загрузке вопросов');
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = async (type: Question['type']) => {
    if (!templateId) return;

    const newQuestion: Omit<Question, 'id'> = {
      template_id: templateId,
      type,
      title: 'Новый вопрос',
      description: '',
      options: type === 'checkbox' ? [] : undefined,
      show_in_results: true,
      is_deleted: false,
    };

    try {
      const createdQuestion = await createQuestion(templateId, newQuestion);
      setQuestions((prev) => [...prev, createdQuestion]);
    } catch {
      setError('Ошибка при добавлении вопроса');
    }
  };

  return { questions, loadQuestions, addQuestion, loading, error };
};
