import {
  createQuestion as createQuestionRepository,
  getQuestionsByTemplate as getQuestionsByTemplateRepository,
  findQuestionById as findQuestionByIdRepository,
} from '../repositories/questionRepository';
import { Template } from '../entities/Template';

export const createQuestion = async (
  template: Template,
  title: string,
  question_type: string,
  description: string,
  question_order: number
) => {
  return await createQuestionRepository({
    template,
    title,
    question_type,
    description,
    question_order,
  });
};

export const getQuestionsByTemplate = async (templateId: number) => {
  return await getQuestionsByTemplateRepository(templateId);
};

export const getQuestionById = async (questionId: number) => {
  return await findQuestionByIdRepository(questionId);
};
