import { AppDataSource } from '../config/ormconfig';
import { Template } from '../entities/Template';

const templateRepository = AppDataSource.getRepository(Template);

// Получение всех шаблонов (без фильтрации по пользователю)
export const getAllTemplates = async (): Promise<Template[]> => {
  return await templateRepository.find({
    where: { is_deleted: false },
    relations: ['author', 'topic'],
  });
};

// Получение шаблонов конкретного пользователя
export const getUserTemplates = async (userId: number): Promise<Template[]> => {
  return await templateRepository.find({
    where: { author: { id: userId }, is_deleted: false },
    relations: ['author', 'topic'],
  });
};

// Получение шаблона по ID
export const findTemplateById = async (
  templateId: number
): Promise<Template | null> => {
  return await templateRepository.findOne({
    where: { id: templateId, is_deleted: false },
    relations: ['author', 'topic'],
  });
};

// Создание нового шаблона
export const createTemplate = async (
  templateData: Partial<Template>
): Promise<Template> => {
  const newTemplate = templateRepository.create(templateData);
  return await templateRepository.save(newTemplate);
};

// Обновление шаблона
export const updateTemplate = async (
  templateId: number,
  updatedData: Partial<Template>
): Promise<Template | null> => {
  const template = await templateRepository.findOne({
    where: { id: templateId },
  });
  if (!template) return null;

  templateRepository.merge(template, updatedData);
  return await templateRepository.save(template);
};

// Логическое удаление шаблона
export const deleteTemplate = async (templateId: number): Promise<boolean> => {
  const template = await templateRepository.findOne({
    where: { id: templateId },
  });
  if (!template) return false;

  template.is_deleted = true; // Установка флага is_deleted в true
  await templateRepository.save(template);
  return true;
};
