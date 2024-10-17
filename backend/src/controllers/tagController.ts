import { Request, Response, NextFunction } from 'express';
import {
  getAllTags as getAllTagsService,
  createTag as createTagService,
  getTagById as getTagByIdService,
} from '../services/tagService';

export const getAllTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await getAllTagsService();
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

export const createTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tag_name } = req.body;

  try {
    if (!tag_name) {
      return res.status(400).json({ message: 'Tag name is required' });
    }

    const newTag = await createTagService(tag_name);
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};

export const getTagById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const tag = await getTagByIdService(parseInt(id, 10));
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    next(error);
  }
};
