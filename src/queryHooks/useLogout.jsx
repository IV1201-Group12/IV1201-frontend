import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../api/auth';
import useAuth from '../context/AuthContext';

export function useLogout() {
  const { removeCurrentUser } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const result = await logoutUser();
      removeCurrentUser();
      return result.data;
    },
    onError: (error) => {
      error.message = 'Server error';
    },
  });
}
