import { useQuery } from '@tanstack/react-query';
import { getApplication } from '../api/applications';

export function useGetApplication(id) {
  return useQuery({
    queryKey: ['application'],
    queryFn: () => getApplication(id),
  });
}
