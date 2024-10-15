import jwt from 'jsonwebtoken';

// Генерация JWT-токена с id, именем и ролью
export const generateJwtToken = (
  id: number, // Переименовал на более краткий id
  username: string,
  role: string
) => {
  return jwt.sign(
    { id, username, role }, // Сохраняем id, username и role в payload токена
    process.env.JWT_SECRET as string, // Используем секретный ключ для подписи
    { expiresIn: '1h' } // Токен действителен 1 час
  );
};
