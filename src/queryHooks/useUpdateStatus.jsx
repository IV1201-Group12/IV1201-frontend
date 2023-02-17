import { useMutation } from '@tanstack/react-query';
import { updateStatusOfApplication } from '../api/applications';

export function useUpdateStatus() {
  return useMutation({
    mutationFn: async ({ statusSelected, id, version }) => {
      return await updateStatusOfApplication(statusSelected, id, version);
    },
  });
}
