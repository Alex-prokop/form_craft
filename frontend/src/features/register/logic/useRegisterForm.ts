// features/register/logic/useRegisterForm.ts
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
      console.log('Успешная регистрация:', response);

      console.log('Перенаправление на /user');
      navigate('/user');
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
