import { useMutation } from '@tanstack/react-query';

import { TCreateAppParams, TEditAppParams, TEditAppTabsParams } from '~utils/mappers';

import { useAuth } from '../auth';
import { useApi } from './api';

export const useUrlValidate = () => {
  const { createAppClient } = useApi();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (url: string) =>
      await createAppClient.urlValidate({ url, YII_CSRF_TOKEN: token }),
  });
};

export const useNameValidate = () => {
  const { createAppClient } = useApi();

  return useMutation({
    mutationFn: async (name: string) => await createAppClient.nameValidate({ name }),
  });
};

export const useParse = () => {
  const { createAppClient } = useApi();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (url: string) => await createAppClient.parse(url, token),
  });
};

export const useUrlWithTabs = () => {
  const { createAppClient } = useApi();

  return useMutation({
    mutationFn: async (values: TCreateAppParams) => await createAppClient.urlWithTabs(values),
  });
};

export const useCreateWebsiteApp = () => {
  const { createAppClient } = useApi();

  return useMutation({
    mutationFn: async (values: TCreateAppParams) => await createAppClient.createWebsiteApp(values),
  });
};

export const useEditWebsiteApp = () => {
  const { createAppClient } = useApi();

  return useMutation({
    mutationFn: async (values: TEditAppParams) => await createAppClient.editWebsiteApp(values),
  });
};

export const useEditWebsiteAppTabs = () => {
  const { createAppClient } = useApi();

  return useMutation({
    mutationFn: async (values: TEditAppTabsParams) =>
      await createAppClient.editWebsiteAppTabs(values),
  });
};

export const useEmpty = () => {
  const { createAppClient } = useApi();

  return useMutation({
    mutationFn: async () => await createAppClient.getEmpty(),
  });
};
