import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/auth';

export function useRegister() {
  return useMutation({
    mutationFn: async (registrationData) => {
      const result = await registerUser(registrationData);
      return result.data;
    },
  });
}
