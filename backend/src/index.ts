import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './config/ormconfig';
import { port } from './config/envConfig';
import { seedRoles } from './scripts/seedRoles';

AppDataSource.initialize()
  .then(() => {
    console.log('База данных успешно подключена');

    seedRoles().then(() => {
      app.listen(port, () => {
        console.log(`Бэкенд запущен на порту ${port}`);
      });
    });
  })
  .catch((error) => {
    console.error('Ошибка подключения к базе данных:', error);
  });
