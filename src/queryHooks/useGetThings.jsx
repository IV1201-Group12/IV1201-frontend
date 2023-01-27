import { useQuery } from '@tanstack/react-query';
import { getAllThings } from '../api/things';

export function useGetThings() {
  return useQuery({
    queryKey: ['things'],
    queryFn: () => getAllThings(),
  });
}
