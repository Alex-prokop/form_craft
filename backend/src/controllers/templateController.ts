import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

import {
  getAllTemplates as getAllTemplatesService,
  createTemplate as createTemplateService,
  getTemplateById as getTemplateByIdService,
} from '../services/templateService';
import { getUserByIdService } from '../services/userService';
import { findTopicById } from '../services/topicService';

export const getAllTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const templates = await getAllTemplatesService();
    res.json(templates);
  } catch (error) {
    next(error);
  }
};

export const createTemplate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, description, topicId } = req.body;
  const userId = req.user?.id;

  try {
    // Проверка наличия авторизованного пользователя
    if (!userId) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }

    // Получение пользователя по ID из токена
    const author = await getUserByIdService(userId);
    if (!author) {
      return res.status(404).json({ message: 'Автор не найден' });
    }

    // Проверка наличия темы
    const topic = await findTopicById(topicId);
    if (!topic) {
      return res.status(404).json({ message: 'Тема не найдена' });
    }

    // Создание шаблона с использованием ID авторизованного пользователя
    const newTemplate = await createTemplateService(
      author,
      title,
      description,
      topic
    );
    res.status(201).json(newTemplate);
  } catch (error) {
    next(error);
  }
};

export const getTemplateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;

  try {
    const template = await getTemplateByIdService(parseInt(templateId, 10));
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.json(template);
  } catch (error) {
    next(error);
  }
};
