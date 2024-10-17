import {
  createTag as createTagRepository,
  getAllTags as getAllTagsRepository,
  findTagById as findTagByIdRepository,
} from '../repositories/tagRepository';

export const createTag = async (tag_name: string) => {
  return await createTagRepository(tag_name);
};

export const getAllTags = async () => {
  return await getAllTagsRepository();
};

export const getTagById = async (tagId: number) => {
  return await findTagByIdRepository(tagId);
};
