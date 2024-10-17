import {
  createTopic as createTopicRepo,
  getAllTopics as getAllTopicsRepo,
  findTopicById as findTopicByIdRepo,
} from '../repositories/topicRepository';
import { Topic } from '../entities/Topic';

export const createTopic = async (topic_name: string): Promise<Topic> => {
  return await createTopicRepo(topic_name);
};

export const getAllTopics = async (): Promise<Topic[]> => {
  return await getAllTopicsRepo();
};

export const findTopicById = async (topicId: number): Promise<Topic | null> => {
  return await findTopicByIdRepo(topicId);
};
