import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/auth';
export function useRegister() {
  return useMutation({
    mutationFn: async (user) => {
      await registerUser(user);
    },
  });
}