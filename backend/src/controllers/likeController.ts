import { Request, Response, NextFunction } from 'express';
import {
  createLike as createLikeService,
  getLikesByTemplate as getLikesByTemplateService,
  deleteLike as deleteLikeService,
} from '../services/likeService';
import { getTemplateById } from '../services/templateService';
import { getUserByIdService } from '../services/userService';

export const getLikesByTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;

  try {
    const likes = await getLikesByTemplateService(parseInt(templateId, 10));
    res.json(likes);
  } catch (error) {
    next(error);
  }
};

export const createLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;
  const { userId } = req.body;

  try {
    const template = await getTemplateById(parseInt(templateId, 10));
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const user = await getUserByIdService(parseInt(userId, 10));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newLike = await createLikeService(template, user);
    res.status(201).json(newLike);
  } catch (error) {
    next(error);
  }
};

export const deleteLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;
  const { userId } = req.body;

  try {
    await deleteLikeService(parseInt(templateId, 10), parseInt(userId, 10));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
