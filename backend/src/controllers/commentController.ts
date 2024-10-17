import { Request, Response, NextFunction } from 'express';
import {
  createComment as createCommentService,
  getCommentsByTemplate as getCommentsByTemplateService,
} from '../services/commentService';
import { getTemplateById } from '../services/templateService';
import { getUserByIdService } from '../services/userService';

export const getCommentsByTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;

  try {
    const comments = await getCommentsByTemplateService(
      parseInt(templateId, 10)
    );
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;
  const { userId, comment_text } = req.body;

  try {
    const template = await getTemplateById(parseInt(templateId, 10));
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const user = await getUserByIdService(parseInt(userId, 10));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newComment = await createCommentService(template, user, comment_text);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};
