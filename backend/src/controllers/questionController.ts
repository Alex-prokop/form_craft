import { Request, Response, NextFunction } from 'express';
import {
  createQuestion as createQuestionService,
  getQuestionsByTemplate as getQuestionsByTemplateService,
} from '../services/questionService';
import { getTemplateById } from '../services/templateService';

export const getQuestionsByTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;

  try {
    const questions = await getQuestionsByTemplateService(
      parseInt(templateId, 10)
    );
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

export const createQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;
  const { title, question_type, description, question_order } = req.body;

  try {
    const template = await getTemplateById(parseInt(templateId, 10));
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const newQuestion = await createQuestionService(
      template,
      title,
      question_type,
      description,
      question_order
    );

    res.status(201).json(newQuestion);
  } catch (error) {
    next(error);
  }
};
