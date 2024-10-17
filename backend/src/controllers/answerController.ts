import { Request, Response, NextFunction } from 'express';
import {
  createAnswer as createAnswerService,
  getAnswersByForm as getAnswersByFormService,
} from '../services/answerService';
import { getFormById } from '../services/formService';
import { getQuestionById } from '../services/questionService';

export const getAnswersByForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { formId } = req.params;

  try {
    const answers = await getAnswersByFormService(parseInt(formId, 10));
    res.json(answers);
  } catch (error) {
    next(error);
  }
};

export const createAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { formId } = req.params;
  const { questionId, answer_value, answer_type } = req.body;

  try {
    const form = await getFormById(parseInt(formId, 10));
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const question = await getQuestionById(parseInt(questionId, 10));
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const newAnswer = await createAnswerService(
      form,
      question,
      answer_value,
      answer_type
    );
    res.status(201).json(newAnswer);
  } catch (error) {
    next(error);
  }
};
