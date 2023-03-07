import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../api/auth';
import useAuth from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

/**
 * Custom hook wrapping a useMutation hook from React Query (https://www.npmjs.com/package/@tanstack/react-query).
 * The mutation function is a request to log out, returning the data from the response.
 * Clears the current user in the AuthContext.
 * If the request is successful, navigates back to the log in page.
 * Sets the error message appropriately depending on the response.
 * @returns The wrapped useMutation hook.
 */
export function useLogout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { removeCurrentUser } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const result = await logoutUser();
      removeCurrentUser();
      return result.data;
    },
    onSuccess: () => navigate('/login'),
    onError: () => {
      toast.error(t('Errors.ServerError'));
    },
  });
}
