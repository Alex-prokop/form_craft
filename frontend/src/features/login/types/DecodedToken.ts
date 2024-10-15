import { JwtPayload } from 'jwt-decode';

export interface DecodedToken extends JwtPayload {
  role: string; // Добавляем поле 'role', которое будет содержать роль пользователя
}
