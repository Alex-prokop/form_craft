import { AppDataSource } from '../config/ormconfig';
import { Answer } from '../entities/Answer';

const answerRepository = AppDataSource.getRepository(Answer);

export const createAnswer = async (
  answerData: Partial<Answer>
): Promise<Answer> => {
  const newAnswer = answerRepository.create(answerData);
  return await answerRepository.save(newAnswer);
};

export const getAnswersByForm = async (formId: number): Promise<Answer[]> => {
  return await answerRepository.find({
    where: { form: { id: formId }, is_deleted: false },
    relations: ['question'],
  });
};
