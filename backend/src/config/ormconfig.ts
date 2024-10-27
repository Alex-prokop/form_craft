import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: ['dist/entities/**/*.js'],
  migrations: ['dist/migrations/**/*.js'],
  logging: true,
});
1;

// import { DataSource } from 'typeorm';
// import dotenv from 'dotenv';

// dotenv.config();

// export const LocalDataSource = new DataSource({
//   type: 'postgres',
//   url: process.env.DATABASE_URL,
//   synchronize: true,
//   entities: ['src/entities/**/*.ts'], // Используем .ts файлы
//   migrations: ['src/migrations/**/*.ts'], // Используем .ts миграции
//   logging: true,
// });
