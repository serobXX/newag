import { AxiosError, AxiosInstance } from 'axios';
import { createContext, FC, PropsWithChildren, useContext } from 'react';

import { HttpClient } from '../service';

interface HttpClientContext {
  httpClient: HttpClient;
}
interface HttpClientProviderProps extends PropsWithChildren {
  apiBasePath: string;
  requestTimeout: number;
  onError?: (error: AxiosError) => void;
  axiosInstance: AxiosInstance;
}

const HttpClientContext = createContext<HttpClientContext>({} as HttpClientContext);

// Inside of this context we can handle autorization state and force re-login if it is required
export const HttpClientProvider: FC<HttpClientProviderProps> = ({
  apiBasePath,
  axiosInstance,
  requestTimeout,
  onError,
  children,
}) => {
  const httpClient = new HttpClient(axiosInstance, apiBasePath, requestTimeout);

  axiosInstance.interceptors.response.use(undefined, async (error: AxiosError) => {
    // TODO: replace with your own implementation of the api request error handling
    // possible case that can be handled here: statusCode === UNAUTHORIZED => automatic redirect to login page
    if (onError) {
      onError(error);
    }
    return Promise.resolve();
  });

  const value = {
    httpClient,
  };

  return <HttpClientContext.Provider value={value}>{children}</HttpClientContext.Provider>;
};

export const useHttpClient = () => {
  return useContext(HttpClientContext);
};
