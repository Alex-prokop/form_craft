import {
  createQuestion as createQuestionRepository,
  getQuestionsByTemplate as getQuestionsByTemplateRepository,
  findQuestionById as findQuestionByIdRepository,
  updateQuestion as updateQuestionRepository,
  deleteQuestion as deleteQuestionRepository,
} from '../repositories/questionRepository';
import { Template } from '../entities/Template';
import { QuestionType } from '../entities/Question';

// Создание вопроса с проверкой типа
export const createQuestion = async (
  template: Template,
  title: string,
  question_type: string,
  description: string,
  question_order: number,
  show_in_results: boolean = true,
  is_deleted: boolean = false
) => {
  if (!Object.values(QuestionType).includes(question_type as QuestionType)) {
    throw new Error('Недопустимый тип вопроса');
  }

  return await createQuestionRepository({
    template,
    title,
    question_type: question_type as QuestionType,
    description,
    question_order,
    show_in_results,
    is_deleted,
  });
};

// Получение вопросов по шаблону
export const getQuestionsByTemplate = async (templateId: number) => {
  try {
    const questions = await getQuestionsByTemplateRepository(templateId);
    return questions;
  } catch (error) {
    console.error(
      `Ошибка при получении вопросов для шаблона ${templateId}:`,
      error
    );
    throw new Error('Ошибка при получении вопросов');
  }
};

// Получение вопроса по ID
export const getQuestionById = async (questionId: number) => {
  try {
    const question = await findQuestionByIdRepository(questionId);
    if (!question) {
      throw new Error('Вопрос не найден');
    }
    return question;
  } catch (error) {
    console.error(`Ошибка при получении вопроса с ID ${questionId}:`, error);
    throw new Error('Ошибка при получении вопроса');
  }
};

// Обновление вопроса
export const updateQuestion = async (
  questionId: number,
  updatedData: Partial<{
    question_type: string;
    title: string;
    description: string;
    question_order: number;
    show_in_results: boolean;
    is_deleted: boolean;
  }>
) => {
  // Проверка типа вопроса, если он передан
  if (
    updatedData.question_type &&
    !Object.values(QuestionType).includes(
      updatedData.question_type as QuestionType
    )
  ) {
    throw new Error('Недопустимый тип вопроса');
  }

  // Приведение типа question_type к QuestionType
  const updatedQuestionData = {
    ...updatedData,
    question_type: updatedData.question_type
      ? (updatedData.question_type as QuestionType)
      : undefined,
  };

  try {
    const updatedQuestion = await updateQuestionRepository(
      questionId,
      updatedQuestionData
    );

    if (!updatedQuestion) {
      throw new Error('Вопрос не найден');
    }

    return updatedQuestion;
  } catch (error) {
    console.error(`Ошибка при обновлении вопроса с ID ${questionId}:`, error);
    throw new Error('Ошибка при обновлении вопроса');
  }
};

// Удаление вопроса (мягкое удаление)
export const deleteQuestion = async (questionId: number) => {
  try {
    const deleted = await deleteQuestionRepository(questionId);
    return deleted;
  } catch (error) {
    console.error(`Ошибка при удалении вопроса с ID ${questionId}:`, error);
    throw new Error('Ошибка при удалении вопроса');
  }
};
