import { Request, Response } from 'express';
import {
  addTagToTemplate,
  getTagsByTemplate,
} from '../services/templateTagService';
import { getTemplateById } from '../services/templateService';
import { getTagById } from '../services/tagService';

export const getTagsForTemplate = async (req: Request, res: Response) => {
  const { templateId } = req.params;

  try {
    const tags = await getTagsByTemplate(parseInt(templateId, 10));
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении тегов для шаблона' });
  }
};

export const addTagToTemplateController = async (
  req: Request,
  res: Response
) => {
  const { templateId } = req.params;
  const { tagId } = req.body;

  try {
    const template = await getTemplateById(parseInt(templateId, 10));
    if (!template) {
      return res.status(404).json({ message: 'Шаблон не найден' });
    }

    const tag = await getTagById(parseInt(tagId, 10));
    if (!tag) {
      return res.status(404).json({ message: 'Тег не найден' });
    }

    const newTemplateTag = await addTagToTemplate(template, tag);
    res.status(201).json(newTemplateTag);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении тега к шаблону' });
  }
};
