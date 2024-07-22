import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { CircularProgress } from '~components/CircularProgress/CircularProgress';
import { PATHS } from '~constants/paths';
import { useAppList, useGetWidgetData } from '~hooks/api/dashboard';
import { useCreateApp } from '~hooks/create-app';
import { getCurrentUnixTime } from '~utils/dates';
import { getBuildEnvVar } from '~utils/env';

import { Breadcrumbs } from '../../Breadcrumbs/Breadcrumbs';
import { Header } from '../../Header/Header';
import { Preview } from '../../Preview/Preview';
import { ColorButtons, ColorPaletteButtons } from '../Customization/constants';
import { FeaturesList } from '../Plugins/constants';
import { CircularProgressWrapper, PreviewWrapper, Wrapper } from './styles';
import { useTour } from '@reactour/tour';
import { useDashboard } from '~hooks/dashboard';
import { IappList } from '../../../service/dashboard';

export const CREATE_APP_PATHS: string[] = [
  PATHS.EDIT,
  PATHS.CREATE_APP,
  PATHS.CUSTOMIZATION,
  PATHS.FEATURE,
  PATHS.PLUGINS,
];

export const Layout = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const isDesktopM = useMediaQuery(theme.breakpoints['--desktop-m']);

  const {
    setUrl,
    setAppName,
    setEmail,
    setAppIcon,
    setAppLayoutView,
    setActionBar,
    setColorTheme,
    setAcid,
    setMultisubmitToken,
    setPlugins,
    clearValues,
  } = useCreateApp();
  const getWidgetData = useGetWidgetData();
  const [isLoading, setLoading] = useState(true);
  const { appList, setAppList } = useDashboard();

  const appListQuery = useAppList();
  const isCreateApp = CREATE_APP_PATHS.includes(window.location.pathname.split('/')?.pop() ?? '');
  const isLogin = PATHS.LOGIN.includes(window.location.pathname.split('/')?.pop() ?? '');
  const isBlocked = PATHS.BLOCKED === window.location.pathname.split('/')?.pop() ?? ''
  const widgetId = location.state?.widgetId as string;
  useEffect(() => {
    appListQuery.mutateAsync().then((response: IappList) => {
      setAppList(response?.widgetsArray);
    });
  }, [])
  useEffect(() => {
    if (widgetId) {
      setLoading(true);
      getWidgetData.mutateAsync(widgetId).then((response) => {
        if (!!response?.ok && !!response?.data) {
          const {
            content,
            caption,
            email,
            navigationType,
            actionBar,
            colorPrimary,
            acid,
            oneSignalAppId,
            multisubmitToken,
          } = response.data;
          const colorId =
            Object.entries(ColorPaletteButtons)?.find(
              ([, value]) => value.colorPrimary === colorPrimary,
            )?.[0] ?? '';

          setUrl(content ?? '');
          setAppName(caption ?? '');
          setEmail(email ?? '');
          setAppIcon(
            `${getBuildEnvVar(
              'API_BASE_PATH',
            )}/geticon.php?wid=${widgetId}&c=${getCurrentUnixTime()}`,
          );
          setAppLayoutView(navigationType ?? 'SLIDER');
          setActionBar(!!actionBar);
          setColorTheme(ColorButtons.find(({ id }) => id === colorId) ?? ColorButtons[0]);
          setAcid(acid ?? '');
          setMultisubmitToken(multisubmitToken ?? '');
          setPlugins(
            oneSignalAppId
              ? { [FeaturesList[0].text]: { ...FeaturesList[0], oneSignalAppId } }
              : {},
          );
        }

        setLoading(false);
      });
    } else {
      setLoading(false);
    }
    clearValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetId]);

  return (
    <>
      {
        !isBlocked && <>
          <Header />
          {
            !isLogin && <Breadcrumbs width={isCreateApp ? 1182 : 832} />
          }
        </>
      }

      {
        isCreateApp ? (
          <>
            {isLoading && (
              <CircularProgressWrapper>
                <CircularProgress />
              </CircularProgressWrapper>
            )}
            {!isLoading && (
              <Wrapper $isMobile={isMobile}>
                <Outlet />
                {isDesktopM && (
                  <PreviewWrapper style={widgetId ? { margin: 0 } : {}}>
                    <Preview />
                  </PreviewWrapper>
                )}
              </Wrapper>
            )}
          </>
        ) : (
          <Outlet />
        )
      }
    </>
  );
};
