import { Request, Response, NextFunction } from 'express';
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorId, title, description, topicId } = req.body;

  try {
    const author = await getUserByIdService(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const topic = await findTopicById(topicId); // Убрали topicRepository
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

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
