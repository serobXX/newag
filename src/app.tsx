import './i18n';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

import { ApiProvider } from '~hooks/api/api';
import { AuthProvider } from '~hooks/auth';
import { CreateAppProvider } from '~hooks/create-app';
import { DashboardProvider } from '~hooks/dashboard';
import { HttpClientProvider } from '~hooks/http-client';
import { getBuildEnvVar } from '~utils/env';
import { MixpanelProvider } from 'react-mixpanel-browser';
import { ErrorBoundary } from './containers/ErrorBoundary';
import { ThemeProvider } from './hooks';
import { Routes } from './routes/routes';
import { PATHS } from '~constants/paths';
import { AgAnalyticsProvider } from '~hooks/agAnal';
import { CTourProvider } from '~hooks/tour/TourProvider';

const queryClient = new QueryClient();
const axiosInstance = axios.create();

export const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <HttpClientProvider
        apiBasePath={getBuildEnvVar('API_BASE_PATH')}
        axiosInstance={axiosInstance}
        requestTimeout={parseFloat(getBuildEnvVar('API_REQUEST_TIMEOUT'))}
        onError={(error) => console.error(error)}
      >
        <AgAnalyticsProvider>
          <MixpanelProvider token={getBuildEnvVar('MIXPANEL_TOKEN')}>
            <ApiProvider>
              <ThemeProvider>
                <DashboardProvider>
                  <CreateAppProvider>
                    <AuthProvider>
                      <CTourProvider>
                        <Routes />
                        <ReactQueryDevtools initialIsOpen={false} />
                      </CTourProvider>
                    </AuthProvider>
                  </CreateAppProvider>
                </DashboardProvider>
              </ThemeProvider>
            </ApiProvider>
          </MixpanelProvider>
        </AgAnalyticsProvider>
      </HttpClientProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);
