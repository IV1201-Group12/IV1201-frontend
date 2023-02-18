import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/auth';
export function useRegister() {
  return useMutation({
    mutationFn: async (user) => {
      await registerUser(user);
    },
    onError: (error) => {
      if (error?.response?.status === 400) {
        error.message = error?.response?.data;
      } else {
        error.message = 'Server error';
      }
    },
  });
}
