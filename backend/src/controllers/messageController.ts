import { Request, Response } from 'express';
import { AppDataSource } from '../config/ormconfig';

export const getTestData = async (req: Request, res: Response) => {
  try {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    const result = await queryRunner.query('SELECT NOW()');

    await queryRunner.release();

    res.json({
      message: 'Соединение успешно установлено',
      result: result,
    });
  } catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Неизвестная ошибка';

    res.status(500).json({
      error: 'Ошибка подключения к базе данных',
      details: errorMessage,
    });
  }
};

export const getMessage = (req: Request, res: Response) => {
  try {
    res.json({ message: 'Привет от бэкенда!' });
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Неизвестная ошибка';

    res.status(500).json({
      error: 'Ошибка при отправке сообщения',
      details: errorMessage,
    });
  }
};
