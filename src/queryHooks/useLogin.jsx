import { useQuery } from '@tanstack/react-query';
import { loginUserFn } from '../api/auth';

export function useLogin(username, password) {
  return useQuery(
    ['login', username, password],
    () => loginUserFn({ username, password }),
    {
      enabled: false,
    },
  );
}
