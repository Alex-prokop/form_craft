import { AppDataSource } from '../config/ormconfig';
import { Template } from '../entities/Template';

const templateRepository = AppDataSource.getRepository(Template);

export const createTemplate = async (
  templateData: Partial<Template>
): Promise<Template> => {
  const newTemplate = templateRepository.create(templateData);
  return await templateRepository.save(newTemplate);
};

export const getAllTemplates = async (): Promise<Template[]> => {
  return await templateRepository.find({ relations: ['author', 'topic'] });
};

export const findTemplateById = async (
  templateId: number
): Promise<Template | null> => {
  return await templateRepository.findOne({
    where: { id: templateId },
    relations: ['author', 'topic'],
  });
};
