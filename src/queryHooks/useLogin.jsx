import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/auth';
import useAuth from '../context/AuthContext';

/**
 * Custom hook wrapping a useMutation hook from React Query (https://www.npmjs.com/package/@tanstack/react-query).
 * The mutation function is a request to log in, returning the data from the response.
 * If the request is successful, sets the logged in user in the AuthContext.
 * Sets the error message appropriately depending on the response.
 * @param {*} username The given username.
 * @param {*} password The given password.
 * @returns The wrapped useMutation hook.
 */
export function useLogin() {
  const { setCurrentUser } = useAuth();

  return useMutation({
    mutationFn: async ({ username, password }) => {
      if (!(username && password)) {
        throw Error('All fields are required');
      }
      const result = await loginUser(username, password);
      return result.data;
    },
    onSuccess: (data) => {
      setCurrentUser(
        JSON.stringify({ username: data.username, role: data.role }),
      );
    },
    onError: (error) => {
      if (error.message === 'All fields are required') {
        return;
      }
      if (error?.response?.status === 401) {
        error.message = 'No user with those credentials';
      } else {
        error.message = 'Server error';
      }
    },
  });
}
