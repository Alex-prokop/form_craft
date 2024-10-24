import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import {
  createQuestion as createQuestionService,
  getQuestionsByTemplate as getQuestionsByTemplateService,
  updateQuestion as updateQuestionService,
  deleteQuestion as deleteQuestionService,
} from '../services/questionService';
import { getTemplateById } from '../services/templateService';
import { QuestionType } from '../entities/Question';

// Массив допустимых типов вопросов
const allowedQuestionTypes = Object.values(QuestionType);

// Получение вопросов по шаблону
export const getQuestionsByTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;

  console.log(`Получение вопросов для шаблона с ID: ${templateId}`);

  try {
    const questions = await getQuestionsByTemplateService(
      parseInt(templateId, 10)
    );

    if (!questions || questions.length === 0) {
      console.log(`Вопросы не найдены для шаблона с ID: ${templateId}`);
      return res.status(404).json({ message: 'Вопросы не найдены' });
    }

    console.log(
      `Найдено ${questions.length} вопросов для шаблона с ID: ${templateId}`
    );
    res.json(questions);
  } catch (error) {
    console.error('Ошибка при получении вопросов:', error);
    next(error);
  }
};

// Создание вопроса
export const createQuestion = async (
  req: AuthenticatedRequest, // Используем AuthenticatedRequest для проверки авторизации
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;
  const {
    title,
    question_type,
    description,
    question_order,
    show_in_results,
    is_deleted,
  } = req.body;

  try {
    // Проверка на существование шаблона
    const template = await getTemplateById(parseInt(templateId, 10));
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    // Проверка допустимости типа вопроса
    if (!allowedQuestionTypes.includes(question_type)) {
      return res.status(400).json({ message: 'Недопустимый тип вопроса' });
    }

    // Проверка наличия question_order
    if (question_order === undefined || question_order === null) {
      return res
        .status(400)
        .json({ message: '"question_order" не может быть пустым' });
    }

    // Создание нового вопроса
    const newQuestion = await createQuestionService(
      template,
      title,
      question_type,
      description,
      question_order,
      show_in_results,
      is_deleted
    );

    console.log('Вопрос успешно создан:', newQuestion);
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Ошибка при создании вопроса:', error);
    next(error);
  }
};

// Обновление вопроса
export const updateQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { questionId } = req.params;
  const { question_type, ...updatedData } = req.body;

  try {
    // Проверка допустимости типа вопроса
    if (question_type && !allowedQuestionTypes.includes(question_type)) {
      return res.status(400).json({ message: 'Недопустимый тип вопроса' });
    }

    // Обновление вопроса
    const updatedQuestion = await updateQuestionService(
      parseInt(questionId, 10),
      { ...updatedData, question_type }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    console.log('Вопрос успешно обновлен:', updatedQuestion);
    res.json(updatedQuestion);
  } catch (error) {
    console.error('Ошибка при обновлении вопроса:', error);
    next(error);
  }
};

// Удаление вопроса
export const deleteQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { questionId } = req.params;

  try {
    // Удаление вопроса
    const deleted = await deleteQuestionService(parseInt(questionId, 10));

    if (!deleted) {
      return res.status(404).json({ message: 'Question not found' });
    }

    console.log(`Вопрос с ID ${questionId} успешно удален`);
    res.status(204).send(); // Успешное удаление, возвращаем статус 204 (No Content)
  } catch (error) {
    console.error('Ошибка при удалении вопроса:', error);
    next(error);
  }
};
