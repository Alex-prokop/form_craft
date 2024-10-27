import { useLoadQuestions } from './useQuestions/useLoadQuestions';
import { useAddQuestion } from './useQuestions/useAddQuestion';
import { useEditQuestion } from './useQuestions/useEditQuestion';
import { useRemoveQuestion } from './useQuestions/useRemoveQuestion';
import { useQuestionById } from './useQuestions/useQuestionById';
import { Question } from '../types/templateTypes';
import { useCallback } from 'react';

export const useQuestions = () => {
  const { questions, loading, error, loadQuestions, setQuestions } =
    useLoadQuestions();
  const { addQuestion } = useAddQuestion(setQuestions);
  const { editQuestion } = useEditQuestion(setQuestions);
  const { removeQuestion } = useRemoveQuestion(setQuestions);

  // Получение вопроса по ID
  const getQuestionById = useCallback(
    (questionId: number): Question | undefined => {
      return questions.find((q) => q.id === questionId);
    },
    [questions]
  );

  return {
    questions,
    loading,
    error,
    loadQuestions,
    addQuestion,
    editQuestion,
    removeQuestion,
    getQuestionById,
    setQuestions,
  };
};
