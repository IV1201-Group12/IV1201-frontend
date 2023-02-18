import { useMutation } from '@tanstack/react-query';
import { updateStatusOfApplication } from '../api/applications';

export function useUpdateStatus() {
  return useMutation({
    mutationFn: async ({ statusSelected, id, version }) => {
      return await updateStatusOfApplication(statusSelected, id, version);
    },
    onError: (error) => {
      if (error?.response?.status === 409) {
        error.message =
          'The current application is being modified by another user';
      } else {
        error.message = 'Server error';
      }
    },
  });
}
