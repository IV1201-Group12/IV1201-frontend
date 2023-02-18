import { useQuery } from '@tanstack/react-query';
import { getApplication } from '../api/applications';

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
