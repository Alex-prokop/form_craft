import { AppDataSource } from '../config/ormconfig';
import { Question, QuestionType } from '../entities/Question';

const questionRepository = AppDataSource.getRepository(Question);

// Проверка на допустимость типа вопроса
const isValidQuestionType = (type: string): boolean => {
  return Object.values(QuestionType).includes(type as QuestionType);
};

// Создание вопроса
export const createQuestion = async (
  questionData: Partial<Question>
): Promise<Question> => {
  // Валидация типа вопроса
  if (!isValidQuestionType(questionData.question_type!)) {
    throw new Error('Недопустимый тип вопроса');
  }

  const newQuestion = questionRepository.create(questionData);
  return await questionRepository.save(newQuestion);
};

// Получение вопросов по шаблону
export const getQuestionsByTemplate = async (
  templateId: number
): Promise<Question[]> => {
  console.log(`Поиск вопросов для шаблона с ID: ${templateId}`);

  const questions = await questionRepository.find({
    where: { template: { id: templateId }, is_deleted: false },
    order: { question_order: 'ASC' },
  });

  console.log(`Количество найденных вопросов: ${questions.length}`);
  return questions;
};

// Получение вопроса по ID
export const findQuestionById = async (
  questionId: number
): Promise<Question | null> => {
  return await questionRepository.findOne({ where: { id: questionId } });
};

// Обновление вопроса
export const updateQuestion = async (
  questionId: number,
  updatedData: Partial<Question>
): Promise<Question | null> => {
  const question = await questionRepository.findOne({
    where: { id: questionId },
  });
  if (!question) return null;

  // Валидация типа вопроса
  if (
    updatedData.question_type &&
    !isValidQuestionType(updatedData.question_type)
  ) {
    throw new Error('Недопустимый тип вопроса');
  }

  Object.assign(question, updatedData);
  return await questionRepository.save(question);
};

// Удаление вопроса (мягкое удаление)
export const deleteQuestion = async (questionId: number): Promise<boolean> => {
  const question = await questionRepository.findOne({
    where: { id: questionId },
  });
  if (!question) return false;

  question.is_deleted = true;
  await questionRepository.save(question);
  return true;
};
