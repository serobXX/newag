import { useMutation } from '@tanstack/react-query';

import { TSendPluginsEmailParams } from '~types/email';

import { useApi } from './api';

export const useSendPluginsEmail = () => {
  const { emailClient } = useApi();

  return useMutation({
    mutationFn: async (values: TSendPluginsEmailParams) =>
      await emailClient.sendPluginsEmail(values),
  });
};
