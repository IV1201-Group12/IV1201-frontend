import axios from 'axios';
import { apiConfig } from '../config/api-config';

export const authApi = axios.create({
  withCredentials: true,
  baseURL: `${apiConfig.BACKEND_BASEURL}/auth`,
  headers: {
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5173',
    'Content-Type': 'application/json',
  },
});

// authApi.defaults.headers.common['Content-Type'] = 'application/json';

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

export const testEndpoint = async () => {
  const response = await authApi.get('/test');
  return response;
};
