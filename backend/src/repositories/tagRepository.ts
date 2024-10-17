import { AppDataSource } from '../config/ormconfig';
import { Tag } from '../entities/Tag';

const tagRepository = AppDataSource.getRepository(Tag);

export const createTag = async (tag_name: string): Promise<Tag> => {
  const newTag = tagRepository.create({ tag_name });
  return await tagRepository.save(newTag);
};

export const getAllTags = async (): Promise<Tag[]> => {
  return await tagRepository.find();
};

export const findTagById = async (tagId: number): Promise<Tag | null> => {
  return await tagRepository.findOne({
    where: { id: tagId },
  });
};
