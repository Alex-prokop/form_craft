import { jwtDecode } from 'jwt-decode'; // Правильный импорт
import axios from 'axios';
import { LoginFormInputs } from '../types/LoginFormInputs';
import { DecodedToken } from '../types/DecodedToken';

export const loginUser = async (data: LoginFormInputs) => {
  try {
    const response = await axios.post('http://localhost:5001/auth/login', data);

    if (response.status === 200) {
      const { token } = response.data;

      console.log('Token received:', token);

      localStorage.setItem('token', token);

      const decodedToken = jwtDecode<DecodedToken>(token);

      console.log('Decoded token:', decodedToken);

      const role = decodedToken.role;

      console.log('User role:', role);

      return role;
    }
  } catch (error) {
    console.error('Ошибка при авторизации', error);
    throw new Error('Login failed');
  }
};
