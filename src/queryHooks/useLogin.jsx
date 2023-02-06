import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../api/auth';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, password }) => {
      const result = await loginUser(username, password);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.username);
    },
  });
}
