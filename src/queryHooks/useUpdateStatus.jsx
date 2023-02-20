import { useMutation } from '@tanstack/react-query';
import { updateStatusOfApplication } from '../api/applications';

/**
 * Custom hook wrapping a useMutation hook from React Query (https://www.npmjs.com/package/@tanstack/react-query).
 * The mutation function is a request to update the status of an application with a given id to a given status.
 * Sets the error message appropriately depending on the response.
 * @param {*} statusSelected The given status.
 * @param {*} id The given id.
 * @param {*} version The version of the application the client is requesting to update.
 * @returns The wrapped useMutation hook.
 */
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
