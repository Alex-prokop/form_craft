// features/register/ui/RegisterForm.tsx
import React from 'react';
import { useRegisterForm } from '../logic/useRegisterForm';

export const RegisterForm: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit } = useRegisterForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto"
      style={{ maxWidth: '400px' }}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          id="username"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
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
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Register
      </button>
    </form>
  );
};
