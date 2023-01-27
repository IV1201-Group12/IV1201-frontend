import { useQuery } from '@tanstack/react-query';
import { getAllApplications } from '../api/applications';

export function useGetApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: () => getAllApplications(),
  });
}
