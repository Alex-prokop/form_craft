import { AppDataSource } from '../config/ormconfig';
import { findRoleByName } from '../repositories/roleRepository';
import { createUser } from '../repositories/userRepository';
import bcrypt from 'bcrypt';

async function createAdminUser() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const adminRole = await findRoleByName('admin');
    if (!adminRole) {
      console.error('Роль "admin" не найдена.');
      return;
    }

    const saltRounds = 10;
    const plainPassword = 'adminPassword123';
    const passwordHash = await bcrypt.hash(plainPassword, saltRounds);

    const adminUser = await createUser({
      username: 'adminUser',
      email: 'admin@example.com',
      password_hash: passwordHash,
      role: adminRole,
      is_deleted: false,
      is_blocked: false,
    });

    console.log('Администратор успешно создан:', adminUser);
  } catch (error) {
    console.error('Ошибка при создании администратора:', error);
  }
}

createAdminUser();

// изменить в  конфигурации AppDataSource
// entities: ['src/entities/**/*.ts'],
// вызвать:
// npx ts-node src/scripts/createAdminUser.ts
