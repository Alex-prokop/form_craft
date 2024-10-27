import {
  getAllTemplates as getAllTemplatesRepository,
  getUserTemplates as getUserTemplatesRepository,
  findTemplateById as findTemplateByIdRepository,
  createTemplate as createTemplateRepository,
  updateTemplate as updateTemplateRepository,
  deleteTemplate as deleteTemplateRepository,
} from '../repositories/templateRepository';
import { User } from '../entities/User';
import { Topic } from '../entities/Topic';
import { Template } from '../entities/Template';

// Получение всех шаблонов
export const getAllTemplates = async (): Promise<Template[]> => {
  return await getAllTemplatesRepository();
};

// Получение шаблонов конкретного пользователя
export const getUserTemplates = async (userId: number): Promise<Template[]> => {
  return await getUserTemplatesRepository(userId);
};

// Получение шаблона по ID
export const getTemplateById = async (
  templateId: number
): Promise<Template | null> => {
  return await findTemplateByIdRepository(templateId);
};

// Создание нового шаблона
export const createTemplate = async (
  author: User,
  title: string,
  description: string,
  topic: Topic
): Promise<Template> => {
  return await createTemplateRepository({
    author,
    title,
    description,
    topic,
  });
};

// Обновление шаблона
export const updateTemplate = async (
  templateId: number,
  updatedData: Partial<Template>
): Promise<Template | null> => {
  return await updateTemplateRepository(templateId, updatedData);
};

// Логическое удаление шаблона
export const deleteTemplate = async (templateId: number): Promise<boolean> => {
  return await deleteTemplateRepository(templateId);
};
