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
  try {
    console.log(`Поиск вопросов для шаблона с ID: ${templateId}`);

    const questions = await questionRepository.find({
      where: { template: { id: templateId }, is_deleted: false },
      order: { question_order: 'ASC' },
    });

    console.log(`Количество найденных вопросов: ${questions.length}`);
    return questions || []; // Возвращаем пустой массив, если вопросов нет
  } catch (error) {
    console.error(
      `Ошибка при получении вопросов для шаблона с ID ${templateId}:`,
      error
    );
    throw new Error('Ошибка при получении вопросов из базы данных');
  }
};

// Получение вопроса по ID с фильтрацией на удаленные записи
export const findQuestionById = async (
  questionId: number
): Promise<Question | null> => {
  try {
    const question = await questionRepository.findOne({
      where: { id: questionId, is_deleted: false },
    });

    if (!question) {
      console.log(`Вопрос с ID ${questionId} не найден или был удален`);
      return null;
    }

    return question;
  } catch (error) {
    console.error(`Ошибка при получении вопроса с ID ${questionId}:`, error);
    throw new Error('Ошибка при получении данных из базы');
  }
};

// Обновление вопроса с проверкой на существование и тип вопроса
export const updateQuestion = async (
  questionId: number,
  updatedData: Partial<Question>
): Promise<Question | null> => {
  try {
    const question = await questionRepository.findOne({
      where: { id: questionId, is_deleted: false },
    });

    if (!question) {
      console.log(`Вопрос с ID ${questionId} не найден или был удален`);
      return null;
    }

    if (
      updatedData.question_type &&
      !isValidQuestionType(updatedData.question_type)
    ) {
      throw new Error('Недопустимый тип вопроса');
    }

    Object.assign(question, updatedData);
    return await questionRepository.save(question);
  } catch (error) {
    console.error(`Ошибка при обновлении вопроса с ID ${questionId}:`, error);
    throw new Error('Ошибка при обновлении вопроса');
  }
};

// Удаление вопроса (мягкое удаление)
export const deleteQuestion = async (questionId: number): Promise<boolean> => {
  try {
    const question = await questionRepository.findOne({
      where: { id: questionId, is_deleted: false },
    });

    if (!question) {
      console.log(`Вопрос с ID ${questionId} не найден или был удален`);
      return false;
    }

    question.is_deleted = true;
    await questionRepository.save(question);
    console.log(`Вопрос с ID ${questionId} успешно удален (мягкое удаление)`);
    return true;
  } catch (error) {
    console.error(`Ошибка при удалении вопроса с ID ${questionId}:`, error);
    throw new Error('Ошибка при удалении вопроса');
  }
};
