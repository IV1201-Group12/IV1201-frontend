import { useMutation } from '@tanstack/react-query';
import { createNewAccount } from '../api/createAccount';
export function useCreateAccount(applicant) {
  return useMutation({
    mutationFn: () => createNewAccount(applicant),
    onSuccess: () => {
      console.log('Success');
    },
  });
}
