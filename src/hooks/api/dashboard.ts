import { useMutation } from '@tanstack/react-query';

import { TSaveOneSignalAppIdParams } from '~utils/mappers';

import { useApi } from './api';

export const useAppList = () => {
  const { dashboardClient } = useApi();

  return useMutation({
    mutationFn: async () => await dashboardClient.getAppList(),
  });
};

export const useGamification = () => {
  const { dashboardClient } = useApi();


  return useMutation({
    mutationFn: async (params: any) => await dashboardClient.getGamification(params),
  });
};

export const usePostGamification = () => {
  const { dashboardClient } = useApi();
  return useMutation({
    mutationFn: async (params: any) => await dashboardClient.postGamification(params),
  });
};

export const useGetWidgetData = () => {
  const { dashboardClient } = useApi();

  return useMutation({
    mutationFn: async (widgetId: string) => await dashboardClient.getWidgetData(widgetId),
    mutationKey: ['widgetId'],
  });
};

export const useSaveOneSignalAppId = () => {
  const { dashboardClient } = useApi();

  return useMutation({
    mutationFn: async (values: TSaveOneSignalAppIdParams) =>
      await dashboardClient.saveOneSignalAppId(values),
  });
};

export const usePublishApp = () => {
  const { dashboardClient } = useApi();
  return useMutation({
    mutationFn: async (wid: string) => await dashboardClient.publishApp(wid),
  });
};
