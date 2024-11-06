import jwt from 'jsonwebtoken';
import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const validateEnvVariables = () => {
  const requiredVars = [
    'SALESFORCE_HOSTNAME',
    'SALESFORCE_API_VERSION',
    'CLIENT_ID',
    'SALESFORCE_USERNAME',
    'JWT_KEY_FILE',
  ];
  for (const variable of requiredVars) {
    if (!process.env[variable]) {
      throw new Error(`Переменная окружения ${variable} не установлена.`);
    }
  }
};

export const getSalesforceAccessToken = (): Promise<{
  accessToken: string;
  instanceUrl: string;
}> => {
  validateEnvVariables();

  return new Promise((resolve, reject) => {
    const clientId = process.env.CLIENT_ID!;
    const username = process.env.SALESFORCE_USERNAME!;
    const hostname = process.env.SALESFORCE_HOSTNAME!;
    const privateKeyPath = process.env.JWT_KEY_FILE!;
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    const payload = {
      iss: clientId,
      sub: username,
      aud: `https://${hostname}`,
      exp: Math.floor(Date.now() / 1000) + 300,
    };
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

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

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        const responseJson = JSON.parse(responseBody);
        res.statusCode === 200
          ? resolve({
              accessToken: responseJson.access_token,
              instanceUrl: responseJson.instance_url,
            })
          : reject(new Error(`Ошибка получения access token: ${responseBody}`));
      });
    });

    req.on('error', (error) => {
      console.error('Ошибка HTTP-запроса при получении токена:', error.message);
      reject(error);
    });
    req.write(data);
    req.end();
  });
};

export const revokeSalesforceToken = (accessToken: string): Promise<void> => {
  const hostname = process.env.SALESFORCE_HOSTNAME!;
  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      path: `/services/oauth2/revoke?token=${accessToken}`,
      method: 'POST',
    };

    const req = https.request(options, (res) => {
      res.on('data', (chunk) => {
        console.log('Получен chunk данных при выходе:', chunk.toString());
      });

      res.on('end', () => {
        console.log('Токен успешно аннулирован');
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('Ошибка при аннулировании токена:', error.message);
      reject(error);
    });

    req.end();
  });
};
