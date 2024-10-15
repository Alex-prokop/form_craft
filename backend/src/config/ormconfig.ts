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

// const isProduction = process.env.NODE_ENV === 'production';

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   url: process.env.DATABASE_URL,
//   synchronize: true,  // В продакшене лучше использовать false, чтобы избежать нежелательных изменений схемы
//   entities: isProduction ? ['dist/entities/**/*.js'] : ['src/entities/**/*.ts'],
//   migrations: isProduction ? ['dist/migrations/**/*.js'] : ['src/migrations/**/*.ts'],
//   logging: true,
// });
