import { useMutation } from '@tanstack/react-query';
import { loginUserFn } from '../api/auth';

export function useLogin(credentials) {
  return useMutation((credentials) => loginUserFn(credentials));
}
