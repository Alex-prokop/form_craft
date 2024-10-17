import {
  createAnswer as createAnswerRepository,
  getAnswersByForm as getAnswersByFormRepository,
} from '../repositories/answerRepository';
import { Form } from '../entities/Form';
import { Question } from '../entities/Question';

export const createAnswer = async (
  form: Form,
  question: Question,
  answer_value: string,
  answer_type: string
) => {
  return await createAnswerRepository({
    form,
    question,
    answer_value,
    answer_type,
  });
};

export const getAnswersByForm = async (formId: number) => {
  return await getAnswersByFormRepository(formId);
};
