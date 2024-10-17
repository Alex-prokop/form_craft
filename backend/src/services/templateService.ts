// services/templateService.ts
import {
  createTemplate as createTemplateRepository,
  getAllTemplates as getAllTemplatesRepository,
  findTemplateById as findTemplateByIdRepository,
} from '../repositories/templateRepository';
import { User } from '../entities/User';
import { Topic } from '../entities/Topic';

export const createTemplate = async (
  author: User,
  title: string,
  description: string,
  topic: Topic
) => {
  return await createTemplateRepository({
    author,
    title,
    description,
    topic,
  });
};

export const getAllTemplates = async () => {
  return await getAllTemplatesRepository();
};

export const getTemplateById = async (templateId: number) => {
  return await findTemplateByIdRepository(templateId);
};
