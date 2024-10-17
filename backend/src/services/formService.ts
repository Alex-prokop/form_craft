import {
  createForm as createFormRepository,
  getFormsByTemplate as getFormsByTemplateRepository,
  getFormsByUser as getFormsByUserRepository,
  findFormById as findFormByIdRepository,
} from '../repositories/formRepository';
import { Template } from '../entities/Template';
import { User } from '../entities/User';

export const createForm = async (template: Template, user: User) => {
  return await createFormRepository({ template, user });
};

export const getFormsByTemplate = async (templateId: number) => {
  return await getFormsByTemplateRepository(templateId);
};

export const getFormsByUser = async (userId: number) => {
  return await getFormsByUserRepository(userId);
};

export const getFormById = async (formId: number) => {
  return await findFormByIdRepository(formId);
};
