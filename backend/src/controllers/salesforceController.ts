import { Request, Response, NextFunction } from 'express';
import { getSalesforceAccessToken } from '../utils/getSalesforceAccessToken';
import https from 'https';

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
    console.log('Запрос на получение access_token');
    const accessToken = await getSalesforceAccessToken();
    console.log('Получен access_token:', accessToken);

    console.log('Создание Account с данными:', {
      Name: username,
      Phone: phone || '',
    });
    const accountId = await createSalesforceRecord(
      'Account',
      {
        Name: username,
        Phone: phone || '', // Необязательное поле
      },
      accessToken
    );
    console.log('Account создан, ID:', accountId);

    console.log('Создание Contact с данными:', {
      AccountId: accountId,
      LastName: username,
      Email: email,
    });
    await createSalesforceRecord(
      'Contact',
      {
        AccountId: accountId,
        LastName: username, // LastName обязателен для Contact
        Email: email, // Email пользователя
      },
      accessToken
    );

    res.status(201).json({
      message: 'Account и Contact успешно созданы в Salesforce',
    });
  } catch (error) {
    console.error('Ошибка при создании аккаунта в Salesforce:', error);
    res.status(500).json({
      message: 'Внутренняя ошибка сервера',
      error: (error as Error).message,
    });
  }
};

const createSalesforceRecord = (
  objectName: string,
  data: object,
  accessToken: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const dataString = JSON.stringify(data);
    const hostname = process.env.SALESFORCE_HOSTNAME;
    const apiVersion = process.env.SALESFORCE_API_VERSION;

    console.log(
      `Отправка запроса на создание ${objectName} с данными:`,
      dataString
    );

    const options = {
      hostname: hostname,
      path: `/services/data/${apiVersion}/sobjects/${objectName}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': dataString.length,
      },
    };

    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        console.log(
          `Ответ от Salesforce при создании ${objectName}:`,
          responseBody
        );
        if (res.statusCode === 201) {
          const responseJson = JSON.parse(responseBody);
          resolve(responseJson.id); // Возвращаем ID созданной записи
        } else {
          reject(new Error(`Ошибка создания ${objectName}: ${responseBody}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(
        `Ошибка HTTP-запроса к Salesforce при создании ${objectName}:`,
        error.message
      );
      reject(error);
    });

    req.write(dataString);
    req.end();
  });
};
