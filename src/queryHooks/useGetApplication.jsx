import { useQuery } from '@tanstack/react-query';
import { getApplication } from '../api/applications';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook wrapping a useQuery hook from React Query (https://www.npmjs.com/package/@tanstack/react-query).
 * The query function is a request for a single application with a given id.
 * Will cache the result with the key "application".
 * Sets the error message appropriately depending on the response.
 * @param {*} id The given id.
 * @returns The wrapped useQuery hook.
 */
export function useGetApplication(id) {
  const { t } = useTranslation();
  return useQuery({
    queryKey: ['application'],
    queryFn: () => getApplication(id),
    onError: (error) => {
      if (error?.response?.status === 403) {
        error.message = t('Errors.LackingPermission');
      } else {
        error.message = t('Errors.ServerError');
      }
    },
    refetchOnWindowFocus: false,
  });
}
