import { useMutation } from '@tanstack/react-query';

import { useApi } from './api';

export const useIsAuth = () => {
  const { authClient } = useApi();

  return useMutation({
    mutationFn: async () => await authClient.isAuth(),
  });
};

export const useGetPremiumStatus = () => {
  const { authClient } = useApi();

  return useMutation({
    mutationFn: async () => await authClient.getPremiumStatus(),
  });
};

export const useGetPremium = () => {
  const { authClient } = useApi();

  return useMutation({
    mutationFn: async () => await authClient.getPremium(),
  });
};
