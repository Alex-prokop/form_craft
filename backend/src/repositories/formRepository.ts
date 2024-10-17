import { AppDataSource } from '../config/ormconfig';
import { Form } from '../entities/Form';

const formRepository = AppDataSource.getRepository(Form);

export const createForm = async (formData: Partial<Form>): Promise<Form> => {
  const newForm = formRepository.create(formData);
  return await formRepository.save(newForm);
};

export const getFormsByTemplate = async (
  templateId: number
): Promise<Form[]> => {
  return await formRepository.find({
    where: { template: { id: templateId }, is_deleted: false },
    relations: ['user'],
  });
};

export const getFormsByUser = async (userId: number): Promise<Form[]> => {
  return await formRepository.find({
    where: { user: { id: userId }, is_deleted: false },
    relations: ['template'],
  });
};

export const findFormById = async (formId: number): Promise<Form | null> => {
  return await formRepository.findOne({
    where: { id: formId, is_deleted: false },
    relations: ['template', 'user'],
  });
};
