import bcrypt from 'bcryptjs';
import { findUserWithRoleByEmail } from '../../repositories/userRepository';
import { generateJwtToken } from '../../utils/jwtUtils';
import { InvalidCredentialsError } from './errors';

export const login = async (email: string, password: string) => {
  const user = await findUserWithRoleByEmail(email);

  if (!user) {
    throw new InvalidCredentialsError('Неверный email или пароль');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new InvalidCredentialsError('Неверный email или пароль');
  }

  const token = generateJwtToken(user.id, user.username, user.role.role_name);
  return { message: 'Аутентификация успешна', token };
};
