import { useQuery } from '@tanstack/react-query';
import { getAllApplications } from '../api/applications';

/**
 * Custom hook wrapping a useQuery hook from React Query (https://www.npmjs.com/package/@tanstack/react-query).
 * The query function is a request for all applications.
 * Will cache the result with the key "applications".
 * Sets the error message appropriately depending on the response.
 * @returns The wrapped useQuery hook.
 */
export function useGetApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: () => getAllApplications(),
    onError: (error) => {
      if (error?.response?.status === 403) {
        error.message = 'Lacking permission to view that resource';
      } else {
        error.message = 'Server error';
      }
    },
  });
}
