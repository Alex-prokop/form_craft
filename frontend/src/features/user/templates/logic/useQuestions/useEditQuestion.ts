import { useCallback } from 'react';
import { updateQuestion } from '../../api/questionApi';
import { Question } from '../../types/templateTypes';

// Хук для редактирования вопроса
export const useEditQuestion = (
  setQuestions: (
    questions: Question[] | ((prevQuestions: Question[]) => Question[])
  ) => void
) => {
  const editQuestion = useCallback(
    async (
      questionId: number,
      questionData: Partial<Omit<Question, 'id' | 'created_at' | 'updated_at'>>
    ) => {
      try {
        const updatedQuestion = await updateQuestion(questionId, questionData);
        if (updatedQuestion) {
          setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
              q.id === updatedQuestion.id ? updatedQuestion : q
            )
          );
        }
      } catch (error) {
        console.error('Ошибка при обновлении вопроса:', error);
      }
    },
    [setQuestions]
  );

  return { editQuestion };
};
