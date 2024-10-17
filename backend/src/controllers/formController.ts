import { Request, Response, NextFunction } from 'express';
import {
  createForm as createFormService,
  getFormsByTemplate as getFormsByTemplateService,
  getFormsByUser as getFormsByUserService,
} from '../services/formService';
import { getTemplateById } from '../services/templateService';
import { getUserByIdService } from '../services/userService';

export const getFormsByTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { templateId } = req.params;

  try {
    const forms = await getFormsByTemplateService(parseInt(templateId, 10));
    res.json(forms);
  } catch (error) {
    next(error);
  }
};

export const getFormsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const forms = await getFormsByUserService(parseInt(userId, 10));
    res.json(forms);
  } catch (error) {
    next(error);
  }
};

export const createForm = async (
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

    const newForm = await createFormService(template, user);
    res.status(201).json(newForm);
  } catch (error) {
    next(error);
  }
};
