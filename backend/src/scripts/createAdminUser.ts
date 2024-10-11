import { AppDataSource } from '../config/ormconfig';
import { findRoleByName } from '../repositories/roleRepository';
import { createUser } from '../repositories/userRepository';
import bcrypt from 'bcrypt';

async function createAdminUser() {
  try {
    // Инициализация DataSource
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // Найти роль "admin"
    const adminRole = await findRoleByName('admin');
    if (!adminRole) {
      console.error('Роль "admin" не найдена.');
      return;
    }

    // Хешируем пароль
    const saltRounds = 10;
    const plainPassword = 'adminPassword123'; // Придумай надежный пароль
    const passwordHash = await bcrypt.hash(plainPassword, saltRounds);

    // Создаем пользователя администратора
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

// Вызов функции создания администратора
createAdminUser();

// изменить в  конфигурации AppDataSource
// entities: ['src/entities/**/*.ts'],
// вызвать:
// npx ts-node src/scripts/createAdminUser.ts
