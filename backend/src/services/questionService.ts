import {
  createQuestion as createQuestionRepository,
  getQuestionsByTemplate as getQuestionsByTemplateRepository,
  findQuestionById as findQuestionByIdRepository,
  updateQuestion as updateQuestionRepository,
  deleteQuestion as deleteQuestionRepository,
} from '../repositories/questionRepository';
import { Template } from '../entities/Template';
import { QuestionType } from '../entities/Question';

// Функция для проверки допустимости типа вопроса
const isValidQuestionType = (type: string): boolean => {
  return Object.values(QuestionType).includes(type as QuestionType);
};

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
  // Проверка типа вопроса
  if (!isValidQuestionType(question_type)) {
    throw new Error('Недопустимый тип вопроса');
  }

  // Проверка наличия question_order
  if (question_order === undefined || question_order === null) {
    throw new Error('"question_order" не может быть пустым');
  }

  // Создание нового вопроса
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
  return await getQuestionsByTemplateRepository(templateId);
};

// Получение вопроса по ID
export const getQuestionById = async (questionId: number) => {
  return await findQuestionByIdRepository(questionId);
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
    !isValidQuestionType(updatedData.question_type)
  ) {
    throw new Error('Недопустимый тип вопроса');
  }

  // Приведение типа question_type к QuestionType
  const updatedQuestionData = {
    ...updatedData,
    question_type: updatedData.question_type as QuestionType,
  };

  return await updateQuestionRepository(questionId, updatedQuestionData);
};

// Удаление вопроса (мягкое удаление)
export const deleteQuestion = async (questionId: number) => {
  return await deleteQuestionRepository(questionId);
};
