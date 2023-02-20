import axios from 'axios';
import { apiConfig } from '../config/api-config';

/**
 * The Axios instance used for querying the "/auth" endpoint.
 * Sets the XMLHttpRequest.withCredentials property to allow sending and receiving cookies in a cross-site context.
 */
export const authApi = axios.create({
  withCredentials: true,
  baseURL: `${apiConfig.BACKEND_BASEURL}/auth`,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

/**
 * Sends a POST request to the server with the information needed to register a user.
 * @param {*} user The information needed to register a user.
 * @returns The response from the server, indicating if the registration was successful.
 */
export const registerUser = async (user) => {
  const response = await authApi.post('/register', user);
  return response;
};

/**
 * Sends a POST request to the server with a given username and password, attempting to log in.
 * A cookie will be set with an access token if the log in is successful.
 * @param {*} username The given username.
 * @param {*} password The given password.
 * @returns The response from the server, indicating if the log in was successful.
 */
export const loginUser = async (username, password) => {
  const response = await authApi.post('/login', {
    username,
    password,
  });
  return response;
};

/**
 * Sends a GET request to the server, attempting to log out.
 * The cookie with the access token will be cleared if the log out is successful.
 * @returns The response from the server, indicating if the log out was successful.
 */
export const logoutUser = async () => {
  const response = await authApi.get('/logout');
  return response;
};
