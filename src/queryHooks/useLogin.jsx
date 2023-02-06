import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/auth';
import useAuth from '../context/AuthContext';

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async ({ username, password }) => {
      const result = await loginUser(username, password);
      return result.data;
    },
    onSuccess: (data) => {
      login(data.username);
    },
  });
}
