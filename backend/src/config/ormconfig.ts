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

// src/config/ormconfig.ts для добавления через скрипты
// import { DataSource } from 'typeorm';
// import dotenv from 'dotenv';

// dotenv.config();

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   url: process.env.DATABASE_URL,
//   synchronize: true,
//   entities: ['src/entities/**/*.ts'],
//   migrations: ['src/migrations/**/*.ts'],
//   logging: true,
// });
