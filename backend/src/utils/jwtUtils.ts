import jwt from 'jsonwebtoken';

export const generateJwtToken = (
  userId: number,
  username: string,
  role: string
) => {
  return jwt.sign(
    { userId, username, role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );
};
