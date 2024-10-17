import { Request, Response, NextFunction } from 'express';
import {
  getAllTopics as getAllTopicsService,
  createTopic as createTopicService,
  findTopicById as findTopicByIdService,
} from '../services/topicService';

export const getAllTopics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topics = await getAllTopicsService();
    res.json(topics);
  } catch (error) {
    next(error);
  }
};

export const createTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topic_name } = req.body;
    if (!topic_name) {
      return res.status(400).json({ error: 'Topic name is required' });
    }
    const newTopic = await createTopicService(topic_name); // Убрали topicRepository
    res.status(201).json(newTopic);
  } catch (error) {
    next(error);
  }
};

export const findTopicById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topicId = parseInt(req.params.id, 10);
    const topic = await findTopicByIdService(topicId);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    next(error);
  }
};
