import { AppDataSource } from '../config/ormconfig';
import { Role } from '../entities/Role';

export const seedRoles = async () => {
  try {
    // Проверяем, что соединение уже установлено
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const roleRepository = AppDataSource.getRepository(Role);

    // Проверяем существование ролей
    const adminRoleExists = await roleRepository.findOneBy({
      role_name: 'admin',
    });
    const userRoleExists = await roleRepository.findOneBy({
      role_name: 'user',
    });

    if (!adminRoleExists) {
      const adminRole = roleRepository.create({ role_name: 'admin' });
      await roleRepository.save(adminRole);
      console.log('Роль "admin" добавлена');
    } else {
      console.log('Роль "admin" уже существует');
    }

    if (!userRoleExists) {
      const userRole = roleRepository.create({ role_name: 'user' });
      await roleRepository.save(userRole);
      console.log('Роль "user" добавлена');
    } else {
      console.log('Роль "user" уже существует');
    }
  } catch (error) {
    console.error('Ошибка при добавлении ролей:', error);
  }
};
