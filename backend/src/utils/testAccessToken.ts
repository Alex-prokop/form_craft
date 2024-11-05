import { getSalesforceAccessToken } from './getSalesforceAccessToken';

getSalesforceAccessToken()
  .then((token) => console.log('Токен успешно получен:', token))
  .catch((error) => console.error('Ошибка при получении токена:', error));
