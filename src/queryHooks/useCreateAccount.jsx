import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUpUser } from '../api/auth';
export function useCreateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      const result = await signUpUser(user);
      return result;
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['statusCode'], result.status);
    },
  });
}
