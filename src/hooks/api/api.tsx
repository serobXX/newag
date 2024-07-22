import { createContext, FC, PropsWithChildren, useContext } from 'react';

import { CreateAppClient } from '../../service';
import { AuthClient } from '../../service/auth';
import { DashboardClient } from '../../service/dashboard';
import { EmailClient } from '../../service/email';
import { useHttpClient } from '../http-client';

interface ApiContext {
  createAppClient: CreateAppClient;
  dashboardClient: DashboardClient;
  authClient: AuthClient;
  emailClient: EmailClient;
}

const ApiContext = createContext<ApiContext>({} as ApiContext);

interface ApiProviderProps extends PropsWithChildren { }

export const ApiProvider: FC<ApiProviderProps> = ({ children }) => {
  const { httpClient } = useHttpClient();
  const value = {
    createAppClient: new CreateAppClient(httpClient),
    dashboardClient: new DashboardClient(httpClient),
    authClient: new AuthClient(httpClient),
    emailClient: new EmailClient(httpClient),
  };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};
