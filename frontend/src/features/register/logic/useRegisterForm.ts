import { useForm } from 'react-hook-form';
import { RegisterFormInputs } from '../types/RegisterFormInputs';
import { registerUser } from '../api/registerApi';
import { useNavigate } from 'react-router-dom';

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      console.log('Отправка данных:', data);
      const response = await registerUser(data);

      if (response.token) {
        // Проверка наличия токена в ответе
        localStorage.setItem('token', response.token); // Сохранение токена
        console.log('Токен сохранён:', response.token);
      }

      console.log('Успешная регистрация:', response);
      console.log('Перенаправление на /user');
      navigate('/user'); // Редирект на /user
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      // Здесь можно добавить обработку ошибки и сообщение для пользователя
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
