import { useCallback } from 'react';
import { createQuestion } from '../../api/questionApi';
import { Question } from '../../types/templateTypes';

// Хук для добавления вопроса
export const useAddQuestion = (
  setQuestions: (
    questions: Question[] | ((prevQuestions: Question[]) => Question[])
  ) => void
) => {
  const addQuestion = useCallback(
    async (
      templateId: number,
      questionData: Omit<Question, 'id' | 'created_at' | 'updated_at'>
    ) => {
      try {
        const newQuestion = await createQuestion(templateId, questionData);
        if (newQuestion) {
          setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
        }
      } catch (error) {
        console.error('Ошибка при добавлении вопроса:', error);
      }
    },
    [setQuestions]
  );

  return { addQuestion };
};
