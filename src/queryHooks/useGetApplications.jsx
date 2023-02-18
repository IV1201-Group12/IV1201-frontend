import { useQuery } from '@tanstack/react-query';
import { getAllApplications } from '../api/applications';

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
