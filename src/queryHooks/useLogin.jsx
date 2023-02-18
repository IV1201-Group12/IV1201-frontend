import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/auth';
import useAuth from '../context/AuthContext';

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
