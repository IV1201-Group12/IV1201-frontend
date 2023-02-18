import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/auth';
export function useRegister() {
  return useMutation({
    mutationFn: async (user) => {
      if (
        !(
          user.firstname &&
          user.lastname &&
          user.email &&
          user.pnr &&
          user.username &&
          user.password
        )
      ) {
        throw Error('All fields are required');
      }
      await registerUser(user);
    },
    onError: (error) => {
      if (error.message === 'All fields are required') {
        return;
      }
      if (error?.response?.status === 400) {
        error.message = error?.response?.data;
      } else {
        error.message = 'Server error';
      }
    },
  });
}
