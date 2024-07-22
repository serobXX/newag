import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { CircularProgress } from '~components/CircularProgress/CircularProgress';
import { PATHS } from '~constants/paths';
import { useAuth } from '~hooks/auth';
import { setBodyColor } from '~hooks/set-body-color';
import { useDocumentTitle } from '~hooks/use-document-title';

import { CreateApp } from '../containers/pages/CreateApp/CreateApp';
import { Customization } from '../containers/pages/Customization/Customization';
import { Distribute } from '../containers/pages/Distribute/Distribute';
import { Feature } from '../containers/pages/Feature';
import { Layout } from '../containers/pages/Layout/Layout';
import { Main } from '../containers/pages/Main/Main';
import { MyProfile } from '../containers/pages/MyProfile/MyProfile';
import { NotFound } from '../containers/pages/NotFound/NotFound';
import { Plugins } from '../containers/pages/Plugins/Plugins';
import { Publish } from '../containers/pages/Publish/Publish';
import { Login } from '../containers/pages/Login/Login';
import { Referral } from '../containers/pages/Referral/Referral';
import { YourAppsEditMenu } from '../containers/pages/YourAppEditMenu';
import { YourApps } from '../containers/pages/YourApps';
import { CircularProgressWrapper } from './styles';
import { TPathsValues } from './types';
import { Monetize } from '../containers/pages/Monetize/Monetize'

export const publicRoutes = [
  {
    path: PATHS.CREATE_APP,
    children: [
      {
        index: true,
        Component: CreateApp,
      },
      { path: PATHS.CUSTOMIZATION, Component: Customization },
      { path: PATHS.FEATURE, Component: Feature },
      { path: PATHS.PLUGINS, Component: Plugins },
    ],
  },
  { path: PATHS.LOGIN, Component: Login },

  { path: PATHS.FAQ, link: `https://${window.location.hostname}/faq` },
];

export const privateRoutes = [
  { path: PATHS.MAIN, Component: Main },
  {
    path: PATHS.YOUR_APPS,
    children: [
      {
        index: true,
        Component: YourApps,
      },
      {
        path: PATHS.EDIT,
        children: [
          {
            index: true,
            Component: CreateApp,
          },
          { path: PATHS.CUSTOMIZATION, Component: Customization },
          { path: PATHS.FEATURE, Component: Feature },
          { path: PATHS.PLUGINS, Component: Plugins },
          { path: PATHS.MENU, Component: YourAppsEditMenu },
        ],
      },
    ],
  },
  { path: PATHS.PUBLISH, Component: Publish },
  { path: PATHS.MONETIZE, Component: Monetize },
  { path: PATHS.FAQ, link: `https://${window.location.hostname}/faq` },
  { path: PATHS.DISTRIBUTE, Component: Distribute },
  { path: PATHS.REFERRAL, Component: Referral },
  { path: PATHS.MY_PROFILE, Component: MyProfile },
];

export const Routes = () => {
  const theme = useTheme();
  const { isAuth, isLoading } = useAuth();
  const { changeDocumentTitle } = useDocumentTitle();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);

  const initPathName = window.location.pathname.split('/').pop() as TPathsValues;

  useEffect(() => {
    changeDocumentTitle(initPathName);

    if (
      (window.location.pathname.includes(PATHS.CREATE_APP) ||
        window.location.pathname.includes(PATHS.EDIT)) &&
      !isMobile
    ) {
      setBodyColor(theme.colors.background);
    } else {
      setBodyColor(theme.colors.lightSilver);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeDocumentTitle, isMobile]);

  if (isLoading) {
    return (
      <CircularProgressWrapper>
        <CircularProgress />
      </CircularProgressWrapper>
    );
  }

  const router = createBrowserRouter([
    {
      path: '/',
      Component: Layout,
      children: [
        {
          index: true,
          element: <Navigate to={isAuth ? PATHS.MAIN : PATHS.CREATE_APP} replace />,
        },
        ...publicRoutes,
        ...(isAuth ? privateRoutes : []),
        { path: '*', Component: NotFound },
      ],
    },
  ]);

  router.subscribe((state) => {
    if (state.historyAction === 'POP') {
      window.location.reload();
    }

    const pathName = state.location.pathname.split('/').pop() as TPathsValues;

    changeDocumentTitle(pathName);

    if (
      (state.location.pathname.includes(PATHS.CREATE_APP) ||
        state.location.pathname.includes(PATHS.EDIT)) &&
      !isMobile
    ) {
      setBodyColor(theme.colors.background);
    } else {
      setBodyColor(theme.colors.lightSilver);
    }
  });

  return <RouterProvider router={router} />;
};
