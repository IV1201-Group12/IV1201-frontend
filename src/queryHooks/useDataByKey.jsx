import { useQueryClient } from 'react-query';

export function useDataByKey(key) {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(key);
}
