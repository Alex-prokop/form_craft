import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { LoginFormInputs } from '../types/LoginFormInputs';
import { DecodedToken } from '../types/DecodedToken';
import { API_URL } from '../../../constants';

export const loginUser = async (data: LoginFormInputs) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);

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
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Ошибка авторизации');
    }
    throw new Error('Ошибка сети');
  }
};
