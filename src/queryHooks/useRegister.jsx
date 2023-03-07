import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { registerUser } from '../api/auth';
import toast from 'react-hot-toast';
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
    onSuccess: () => {
      toast.success(t('RegisterForm.SuccessMessage'));
    },
    onError: (error) => {
      if (error.message == 'All fields are required') {
        toast.error(t('Errors.AllFields'));
      } else if (error?.response?.status === 400) {
        const response = error.response.data;
        if (response === 'email must be unique') {
          toast.error(t('Errors.NonUniqueEmail'));
        } else if (response === 'pnr must be unique') {
          toast.error(t('Errors.NonUniquePnr'));
        } else if (response === 'username must be unique') {
          toast.error(t('Errors.NonUniqueUsername'));
        } else if (response === 'Username is not valid') {
          toast.error(t('Errors.InvalidUsername'));
        } else if (response === 'Firstname is not valid') {
          toast.error(t('Errors.InvalidFirstName'));
        } else if (response === 'Lastname is not valid') {
          toast.error(t('Errors.InvalidLastName'));
        } else if (response === 'Email is not valid') {
          toast.error(t('Errors.InvalidEmail'));
        } else if (response === 'Pnr is not valid') {
          toast.error(t('Errors.InvalidPnr'));
        } else if (response == 'Password is not valid') {
          toast.error(t('Errors.InvalidPassword'));
        }
      } else {
        toast.error(t('Errors.ServerError'));
      }
    },
  });
}
