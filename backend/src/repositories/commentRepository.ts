import { AppDataSource } from '../config/ormconfig';
import { Comment } from '../entities/Comment';

const commentRepository = AppDataSource.getRepository(Comment);

export const createComment = async (
  commentData: Partial<Comment>
): Promise<Comment> => {
  const newComment = commentRepository.create(commentData);
  return await commentRepository.save(newComment);
};

export const getCommentsByTemplate = async (
  templateId: number
): Promise<Comment[]> => {
  return await commentRepository.find({
    where: { template: { id: templateId }, is_deleted: false },
    relations: ['user'],
  });
};
