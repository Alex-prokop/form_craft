import { AppDataSource } from '../config/ormconfig';
import { User } from '../entities/User';
import { UserNotFoundError } from '../errors/errors';

export const userRepository = AppDataSource.getRepository(User);

// Используется для проверки существования пользователя по имени при регистрации
export const findUserByUsername = async (username: string) => {
  try {
    const user = await userRepository.findOneBy({ username });
    // Возвращаем null, если пользователь не найден (это не ошибка на этапе регистрации)
    return user || null;
  } catch (error) {
    console.error('Error in findUserByUsername:', error);
    throw error; // Выбрасываем ошибку, если что-то пошло не так с запросом
  }
};

// Используется для проверки существования пользователя по email при регистрации
export const findUserByEmail = async (email: string) => {
  try {
    const user = await userRepository.findOneBy({ email });
    // Возвращаем null, если пользователь не найден
    return user || null;
  } catch (error) {
    console.error('Error in findUserByEmail:', error);
    throw error;
  }
};

// Создание нового пользователя
export const createUser = async (userData: Partial<User>) => {
  try {
    const newUser = userRepository.create(userData);
    return await userRepository.save(newUser);
  } catch (error) {
    console.error('Error in createUser:', error);
    throw new Error('Не удалось создать пользователя');
  }
};

// Используется для получения пользователя с ролью по email
export const findUserWithRoleByEmail = async (email: string) => {
  try {
    const user = await userRepository.findOne({
      where: { email },
      relations: ['role'], // Загрузка связанной роли
    });
    if (!user) {
      throw new UserNotFoundError(
        `Пользователь с email ${email} и ролью не найден`
      );
    }
    return user;
  } catch (error) {
    console.error('Error in findUserWithRoleByEmail:', error);
    throw error;
  }
};
