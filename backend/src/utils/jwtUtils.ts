import jwt from 'jsonwebtoken';

// Генерация JWT-токена с id, именем и ролью
export const generateJwtToken = (
  id: number,
  username: string,
  role: string
) => {
  return jwt.sign(
    { id, username, role },
    process.env.JWT_SECRET as string,
    { expiresIn: '12h' } // Токен действителен 12 часов
  );
};
