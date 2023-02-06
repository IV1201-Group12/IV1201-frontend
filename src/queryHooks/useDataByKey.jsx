import { useQueryClient } from '@tanstack/react-query';

export const useDataByKey = (key) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(key);
};
