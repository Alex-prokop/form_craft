import { AppDataSource } from '../config/ormconfig';
import { Question } from '../entities/Question';

const questionRepository = AppDataSource.getRepository(Question);

export const createQuestion = async (
  questionData: Partial<Question>
): Promise<Question> => {
  const newQuestion = questionRepository.create(questionData);
  return await questionRepository.save(newQuestion);
};

export const getQuestionsByTemplate = async (
  templateId: number
): Promise<Question[]> => {
  return await questionRepository.find({
    where: { template: { id: templateId }, is_deleted: false },
    order: { question_order: 'ASC' },
  });
};

export const findQuestionById = async (
  questionId: number
): Promise<Question | null> => {
  return await questionRepository.findOne({
    where: { id: questionId },
  });
};
