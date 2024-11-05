// src/scripts/createExampleUsers.ts
import { AppDataSource } from '../config/ormconfig';
import { findRoleByName } from '../repositories/roleRepository';
import { createUser } from '../repositories/userRepository';
import bcrypt from 'bcrypt';

async function createExampleUsers() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const userRole = await findRoleByName('user');
    if (!userRole) {
      console.error('Роль "user" не найдена.');
      return;
    }

    const saltRounds = 10;

    for (let i = 0; i < 10; i++) {
      const username = `person${i}`;
      const email = `${username}@example.com`;
      const password = username; // Логин равен паролю
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = await createUser({
        username,
        email,
        password_hash: passwordHash,
        role: userRole,
        is_deleted: false,
        is_blocked: false,
      });

      console.log(`Пользователь ${username} успешно создан:`, user);
    }
  } catch (error) {
    console.error('Ошибка при создании пользователей:', error);
  }
}

createExampleUsers();
