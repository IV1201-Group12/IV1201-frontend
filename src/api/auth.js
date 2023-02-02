import axios from 'axios';
import { apiConfig } from '../config/api-config';

export const authApi = axios.create({
  baseURL: `${apiConfig.BACKEND_BASEURL}/auth`,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const signUpUserFn = async (user) => {
  const response = await authApi.post('createAccount', user);
  return response;
};

export const loginUserFn = async (user) => {
  const response = await authApi.post('login', user);
  return response.data;
};
