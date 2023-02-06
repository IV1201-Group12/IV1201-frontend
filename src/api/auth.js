import axios from 'axios';
import { apiConfig } from '../config/api-config';

export const authApi = axios.create({
  withCredentials: true,
  baseURL: `${apiConfig.BACKEND_BASEURL}/auth`,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const signUpUser = async (user) => {
  const response = await authApi.post('createAccount', user);
  return response;
};

export const loginUser = async (username, password) => {
  const response = await authApi.post('/login', {
    username,
    password,
  });
  return response;
};

export const logoutUser = async () => {
  const response = await authApi.get('/logout');
  return response;
};
