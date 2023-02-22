import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { registerUser } from '../api/auth';

/**
 * Custom hook wrapping a useMutation hook from React Query (https://www.npmjs.com/package/@tanstack/react-query).
 * The mutation function is a request to register a user with the given information.
 * If fields are missing, it will throw an error with an appropriate error message.
 * Sets the error message appropriately depending on the response.
 * @param {*} user The given information.
 * @returns The wrapped useMutation hook.
 */
export function useRegister() {
  const { t } = useTranslation();
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
      if (error.message == 'All fields are required') {
        error.message = t('Errors.AllFields');
      } else if (error?.response?.status === 401) {
        error.message = error.message = t('Errors.WrongCredentials');
      } else {
        console.log(error.message);
        error.message = t('Errors.ServerError');
      }
    },
  });
}
