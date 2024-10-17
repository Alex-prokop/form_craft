import { AppDataSource } from '../config/ormconfig';
import { TemplateTag } from '../entities/TemplateTag';

const templateTagRepository = AppDataSource.getRepository(TemplateTag);

export const createTemplateTag = async (
  templateTagData: Partial<TemplateTag>
) => {
  const newTemplateTag = templateTagRepository.create(templateTagData);
  return await templateTagRepository.save(newTemplateTag);
};

export const findTemplateTagsByTemplateId = async (templateId: number) => {
  return await templateTagRepository.find({
    where: { template: { id: templateId }, is_deleted: false },
    relations: ['tag'],
  });
};
