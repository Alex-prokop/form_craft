import { AppDataSource } from '../config/ormconfig';
import { Topic } from '../entities/Topic';

const topicRepository = AppDataSource.getRepository(Topic);

export const createTopic = async (topic_name: string): Promise<Topic> => {
  const newTopic = topicRepository.create({ topic_name });
  return await topicRepository.save(newTopic);
};

export const getAllTopics = async (): Promise<Topic[]> => {
  return await topicRepository.find();
};

export const findTopicById = async (topicId: number): Promise<Topic | null> => {
  return await topicRepository.findOne({
    where: { id: topicId },
  });
};
