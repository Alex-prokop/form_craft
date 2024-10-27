import React from 'react';
import { useLoginForm } from '../logic/useLoginForm';
import { loginUser } from '../api/loginApi';
import { LoginFormInputs } from '../types/LoginFormInputs';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors } = useLoginForm();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const role = await loginUser(data);

      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto"
      style={{ maxWidth: '400px' }}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          // Значение по умолчанию
          // defaultValue="user@example22.com"
          defaultValue="admin@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          // Значение по умолчанию
          // defaultValue="string22"
          defaultValue="adminPassword123"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  );
};
