import {
  createComment as createCommentRepository,
  getCommentsByTemplate as getCommentsByTemplateRepository,
} from '../repositories/commentRepository';
import { Template } from '../entities/Template';
import { User } from '../entities/User';

export const createComment = async (
  template: Template,
  user: User,
  comment_text: string
) => {
  return await createCommentRepository({
    template,
    user,
    comment_text,
  });
};

export const getCommentsByTemplate = async (templateId: number) => {
  return await getCommentsByTemplateRepository(templateId);
};
