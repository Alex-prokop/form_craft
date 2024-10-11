import { useForm } from 'react-hook-form';
import { LoginFormInputs } from '../types/LoginFormInputs';

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  return {
    register,
    handleSubmit,
    errors,
  };
};
