import { useQuery } from '@tanstack/react-query';
import { getApplication } from '../api/applications';

/**
 * Custom hook wrapping a useQuery hook from React Query (https://www.npmjs.com/package/@tanstack/react-query).
 * The query function is a request for a single application with a given id.
 * Will cache the result with the key "application".
 * Sets the error message appropriately depending on the response.
 * @param {*} id The given id.
 * @returns The wrapped useQuery hook.
 */
export function useGetApplication(id) {
  return useQuery({
    queryKey: ['application'],
    queryFn: () => getApplication(id),
    onError: (error) => {
      if (error?.response?.status === 403) {
        error.message = 'Lacking permission to view that resource';
      } else {
        error.message = 'Server error';
      }
    },
  });
}
