import { Request, Response, NextFunction } from 'express';
import { createSalesforceAccountAndContact } from '../services/salesforceService';

export const createSalesforceAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, phone } = req.body;

  if (!username || !email) {
    console.error('Отсутствуют обязательные параметры: username или email');
    return res.status(400).json({ message: 'Username и email обязательны' });
  }

  try {
    const result = await createSalesforceAccountAndContact(
      username,
      email,
      phone
    );
    res.status(result.status).json(result.message);
  } catch (error) {
    console.error('Ошибка при создании аккаунта в Salesforce:', error);
    res.status(500).json({
      message: 'Внутренняя ошибка сервера',
      error: (error as Error).message,
    });
  }
};
