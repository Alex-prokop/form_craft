import jwt from 'jsonwebtoken';
import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const clientId =
  '3MVG9GCMQoQ6rpzT.z0Hft2nMY3w2q8UfyHxP_l0WMZZoADBSY6fhpAFR8Jkv3y5ytAldmBIM8eM2.Kg6azZK';
const username = 'al.al.prokopovich@gmail.com';
const hostname = 'login.salesforce.com';

const privateKeyPath = process.env.JWT_KEY_FILE;

console.log('Начальные параметры:');
console.log('CLIENT_ID:', clientId);
console.log('SALESFORCE_USERNAME:', username);
console.log('SALESFORCE_HOSTNAME:', hostname);
console.log('JWT_KEY_FILE:', privateKeyPath);

export const getSalesforceAccessToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!clientId || !username || !privateKeyPath) {
      console.error('Отсутствуют необходимые параметры');
      return reject(new Error('Не заданы необходимые параметры'));
    }

    let privateKey: string;
    try {
      console.log('Попытка чтения приватного ключа из файла:', privateKeyPath);
      privateKey = fs.readFileSync(privateKeyPath, 'utf8');
      console.log('Приватный ключ успешно прочитан');
    } catch (error) {
      console.error('Ошибка при чтении приватного ключа:', error);
      return reject(new Error('Не удалось прочитать приватный ключ.'));
    }

    try {
      console.log('Проверка параметров:');
      console.log('client_id (iss):', clientId);
      console.log('username (sub):', username);
      console.log('aud:', `https://${hostname}`);
      console.log('exp:', Math.floor(Date.now() / 1000) + 300);

      console.log('Генерация JWT токена');
      const payload = {
        iss: clientId,
        sub: username,
        aud: `https://${hostname}`,
        exp: Math.floor(Date.now() / 1000) + 300,
      };
      console.log('Payload для JWT токена:', JSON.stringify(payload, null, 2));

      const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
      console.log('Сформированный JWT токен:', token);

      const data = new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token,
      }).toString();

      const options = {
        hostname: hostname,
        path: '/services/oauth2/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data),
        },
      };

      console.log(
        'Отправка запроса на получение токена с параметрами:',
        options
      );

      const req = https.request(options, (res) => {
        let responseBody = '';

        res.on('data', (chunk) => {
          console.log('Получен chunk данных:', chunk.toString());
          responseBody += chunk;
        });

        res.on('end', () => {
          console.log('Ответ от Salesforce получен:', responseBody);
          if (res.statusCode === 200) {
            const responseJson = JSON.parse(responseBody);
            console.log('Токен успешно получен:', responseJson.access_token);
            resolve(responseJson.access_token);
          } else {
            console.error(
              'Ошибка получения access token:',
              res.statusCode,
              responseBody
            );
            reject(new Error(`Ошибка получения access token: ${responseBody}`));
          }
        });
      });

      req.on('error', (error) => {
        console.error(
          'Ошибка HTTP-запроса при получении токена:',
          error.message
        );
        reject(error);
      });

      console.log('Отправка данных запроса на сервер:', data);
      req.write(data);
      req.end();
    } catch (error) {
      console.error('Ошибка при создании JWT токена:', error);
      reject(new Error('Не удалось создать JWT токен.'));
    }
  });
};
