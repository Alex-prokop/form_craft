import { Template } from '../entities/Template';
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import {
  getAllTemplates as getAllTemplatesService,
  getUserTemplates as getUserTemplatesService,
  getTemplateById as getTemplateByIdService,
  createTemplate as createTemplateService,
  updateTemplate as updateTemplateService,
  deleteTemplate as deleteTemplateService,
} from '../services/templateService';
import { User } from '../entities/User';
import { Topic } from '../entities/Topic';

// Универсальная функция для обработки запросов
const handleRequest = async (
  req: Request | AuthenticatedRequest,
  res: Response,
  next: NextFunction,
  serviceFunction: Function,
  args: any[] = []
) => {
  try {
    const result = await serviceFunction(...args);
    if (result === null || result === undefined) {
      return res.status(404).json({ message: 'Ресурс не найден' });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Получение всех шаблонов
export const getAllTemplates = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleRequest(req, res, next, getAllTemplatesService);
};

// Получение шаблонов конкретного пользователя
export const getUserTemplates = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'Пользователь не авторизован' });
  }
  handleRequest(req, res, next, getUserTemplatesService, [userId]);
};

// Получение шаблона по ID
export const getTemplateById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;
  handleRequest(req, res, next, getTemplateByIdService, [
    parseInt(templateId, 10),
  ]);
};

// Создание нового шаблона
export const createTemplate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, description, topicId } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'Пользователь не авторизован' });
  }
  handleRequest(req, res, next, createTemplateService, [
    { id: userId } as User,
    title,
    description,
    { id: topicId } as Topic,
  ]);
};

// Обновление шаблона
export const updateTemplate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;
  const { title, description, topicId } = req.body;
  const updatedData: Partial<Template> = { title, description };

  if (topicId) {
    updatedData.topic = { id: topicId } as Topic;
  }

  handleRequest(req, res, next, updateTemplateService, [
    parseInt(templateId, 10),
    updatedData,
  ]);
};

// Логическое удаление шаблона
export const deleteTemplate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;
  handleRequest(req, res, next, deleteTemplateService, [
    parseInt(templateId, 10),
  ]);
};
