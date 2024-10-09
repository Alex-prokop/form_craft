import { AppDataSource } from '../config/ormconfig';
import { Role } from '../entities/Role';

export const roleRepository = AppDataSource.getRepository(Role);

export const findRoleByName = async (roleName: string) => {
  return await roleRepository.findOneBy({ role_name: roleName });
};
