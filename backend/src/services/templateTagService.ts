import {
  createTemplateTag,
  findTemplateTagsByTemplateId,
} from '../repositories/templateTagRepository';
import { Template } from '../entities/Template';
import { Tag } from '../entities/Tag';

export const addTagToTemplate = async (template: Template, tag: Tag) => {
  return await createTemplateTag({ template, tag });
};

export const getTagsByTemplate = async (templateId: number) => {
  return await findTemplateTagsByTemplateId(templateId);
};
