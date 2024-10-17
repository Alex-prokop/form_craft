import { AppDataSource } from '../config/ormconfig';
import { Like } from '../entities/Like';

const likeRepository = AppDataSource.getRepository(Like);

export const createLike = async (likeData: Partial<Like>): Promise<Like> => {
  const newLike = likeRepository.create(likeData);
  return await likeRepository.save(newLike);
};

export const getLikesByTemplate = async (
  templateId: number
): Promise<Like[]> => {
  return await likeRepository.find({
    where: { template: { id: templateId }, is_deleted: false },
    relations: ['user'],
  });
};

export const findLikeByTemplateAndUser = async (
  templateId: number,
  userId: number
): Promise<Like | null> => {
  return await likeRepository.findOne({
    where: { template: { id: templateId }, user: { id: userId } },
  });
};

export const deleteLike = async (like: Like): Promise<Like> => {
  like.is_deleted = true;
  return await likeRepository.save(like);
};
