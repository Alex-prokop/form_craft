import {
  createLike as createLikeRepository,
  getLikesByTemplate as getLikesByTemplateRepository,
  findLikeByTemplateAndUser,
  deleteLike as deleteLikeRepository,
} from '../repositories/likeRepository';
import { Template } from '../entities/Template';
import { User } from '../entities/User';

export const createLike = async (template: Template, user: User) => {
  return await createLikeRepository({ template, user });
};

export const getLikesByTemplate = async (templateId: number) => {
  return await getLikesByTemplateRepository(templateId);
};

export const deleteLike = async (templateId: number, userId: number) => {
  const like = await findLikeByTemplateAndUser(templateId, userId);
  if (like) {
    return await deleteLikeRepository(like);
  }
};
