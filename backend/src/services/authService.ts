// import bcrypt from 'bcryptjs';
// import {
//   findUserByUsername,
//   findUserByEmail,
//   createUser,
//   findUserWithRoleByEmail,
// } from '../repositories/userRepository';
// import { findRoleByName } from '../repositories/roleRepository';
// import { generateJwtToken } from '../utils/jwtUtils';

// // Кастомные ошибки
// class UserExistsError extends Error {
//   constructor(message: string) {
//     super(message);
//     this.name = 'UserExistsError';
//   }
// }

// class InvalidCredentialsError extends Error {
//   constructor(message: string) {
//     super(message);
//     this.name = 'InvalidCredentialsError';
//   }
// }

// export const register = async (
//   username: string,
//   email: string,
//   password: string
// ) => {
//   // Проверяем наличие пользователя или email
//   const existingUser = await findUserByUsername(username);
//   const existingEmail = await findUserByEmail(email);

//   if (existingUser || existingEmail) {
//     throw new UserExistsError('Пользователь или email уже заняты');
//   }

//   if (password.length < 6) {
//     throw new Error('Пароль должен содержать не менее 6 символов');
//   }

//   const password_hash = await bcrypt.hash(password, 10);
//   const userRole = await findRoleByName('user');

//   if (!userRole) {
//     throw new Error('Роль "user" не найдена в базе данных');
//   }

//   // Создаем нового пользователя через репозиторий
//   const newUser = await createUser({
//     username,
//     email,
//     password_hash,
//     role: userRole,
//   });

//   return { message: 'Пользователь успешно зарегистрирован', user: newUser };
// };

// export const login = async (email: string, password: string) => {
//   // Находим пользователя и роль через репозиторий
//   const user = await findUserWithRoleByEmail(email);

//   if (!user) {
//     throw new InvalidCredentialsError('Неверный email или пароль');
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password_hash);

//   if (!isPasswordValid) {
//     throw new InvalidCredentialsError('Неверный email или пароль');
//   }

//   const token = generateJwtToken(user.id, user.username, user.role.role_name);
//   return { message: 'Аутентификация успешна', token };
// };
