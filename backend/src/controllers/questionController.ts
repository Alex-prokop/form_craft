import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import {
  createQuestion as createQuestionService,
  getQuestionsByTemplate as getQuestionsByTemplateService,
  getQuestionById as getQuestionByIdService,
  updateQuestion as updateQuestionService,
  deleteQuestion as deleteQuestionService,
} from '../services/questionService';
import { getTemplateById as getTemplateByIdService } from '../services/templateService';
import { QuestionType } from '../entities/Question';

const allowedQuestionTypes = Object.values(QuestionType);

// Универсальная функция для обработки запросов
const handleRequest = async (
  req: Request | AuthenticatedRequest,
  res: Response,
  next: NextFunction,
  serviceFunction: (...args: any[]) => Promise<any>,
  args: any[] = []
) => {
  try {
    const result = await serviceFunction(...args);
    if (result === null || result === undefined) {
      return res.status(404).json({ message: 'Ресурс не найден' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Внутренняя ошибка сервера', error });
  }
};

// Получение вопросов по шаблону
export const getQuestionsByTemplate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;
  const parsedTemplateId = parseInt(templateId, 10);
  if (isNaN(parsedTemplateId)) {
    return res.status(400).json({ message: 'Некорректный ID шаблона' });
  }

  handleRequest(req, res, next, getQuestionsByTemplateService, [
    parsedTemplateId,
  ]);
};

// Получение вопроса по ID
export const getQuestionById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { questionId } = req.params;
  const parsedQuestionId = parseInt(questionId, 10);
  if (isNaN(parsedQuestionId)) {
    return res.status(400).json({ message: 'Некорректный ID вопроса' });
  }

  handleRequest(req, res, next, getQuestionByIdService, [parsedQuestionId]);
};

// Создание вопроса
export const createQuestion = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;
  const {
    id, // Исключаем ID, если он передан
    title,
    question_type,
    description,
    question_order,
    show_in_results,
    is_deleted,
  } = req.body;

  if (!req.user?.id) {
    return res.status(401).json({ message: 'Пользователь не авторизован' });
  }

  if (!allowedQuestionTypes.includes(question_type)) {
    return res.status(400).json({ message: 'Недопустимый тип вопроса' });
  }

  if (!title || question_order === undefined) {
    return res.status(400).json({ message: 'Обязательные поля не заполнены' });
  }

  try {
    const template = await getTemplateByIdService(parseInt(templateId, 10));
    if (!template) {
      return res.status(404).json({ message: 'Шаблон не найден' });
    }

    // Исключаем ID из данных
    const newQuestion = await createQuestionService(
      template,
      title,
      question_type,
      description,
      question_order,
      show_in_results,
      is_deleted
    );

    res.status(201).json(newQuestion);
  } catch (error) {
    next(error);
  }
};

// Обновление вопроса
export const updateQuestion = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { questionId } = req.params;
  const parsedQuestionId = parseInt(questionId, 10);
  const { question_type, ...updatedData } = req.body;

  if (isNaN(parsedQuestionId)) {
    return res.status(400).json({ message: 'Некорректный ID вопроса' });
  }

  if (question_type && !allowedQuestionTypes.includes(question_type)) {
    return res.status(400).json({ message: 'Недопустимый тип вопроса' });
  }

  handleRequest(req, res, next, updateQuestionService, [
    parsedQuestionId,
    { ...updatedData, question_type },
  ]);
};

// Удаление вопроса (мягкое удаление)
export const deleteQuestion = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { questionId } = req.params;
  const parsedQuestionId = parseInt(questionId, 10);

  if (isNaN(parsedQuestionId)) {
    return res.status(400).json({ message: 'Некорректный ID вопроса' });
  }

  handleRequest(req, res, next, deleteQuestionService, [parsedQuestionId]);
};
