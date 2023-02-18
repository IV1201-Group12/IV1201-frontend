import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../api/auth';
import useAuth from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();
  const { removeCurrentUser } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const result = await logoutUser();
      removeCurrentUser();
      return result.data;
    },
    onSuccess: () => navigate('/login'),
    onError: (error) => {
      error.message = 'Server error';
    },
  });
}
