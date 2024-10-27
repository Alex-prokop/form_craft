import { useCallback } from 'react';
import { deleteQuestion } from '../../api/questionApi';
import { Question } from '../../types/templateTypes';

// Хук для удаления вопроса
export const useRemoveQuestion = (
  setQuestions: (
    questions: Question[] | ((prevQuestions: Question[]) => Question[])
  ) => void
) => {
  const removeQuestion = useCallback(
    async (questionId: string | number) => {
      // Изменено на string | number
      try {
        // Удаляем только если ID — число (реальный ID с сервера)
        if (typeof questionId === 'number') {
          await deleteQuestion(questionId);
        }

        setQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q.id !== questionId)
        );
      } catch (error) {
        console.error('Ошибка при удалении вопроса:', error);
      }
    },
    [setQuestions]
  );

  return { removeQuestion };
};
