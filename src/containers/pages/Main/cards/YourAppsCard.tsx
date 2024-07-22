import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { AppItem } from '~components/AppItem';
import Button from '~components/buttons/Button/Button';
import { CircularProgress } from '~components/CircularProgress/CircularProgress';
import { MainCard } from '~components/MainCard';
import { PATHS } from '~constants/paths';
import { TAppItem, useDashboard } from '~hooks/dashboard';
import { getCurrentUnixTime } from '~utils/dates';
import { getBuildEnvVar } from '~utils/env';
import { useAuth } from '~hooks/auth';
import { CircularProgressWrapper, ControlsWrapper } from '../styles';
import { DownloadModal } from '../../../DownloadModal/DownloadModal';
import { useCreateApp } from '~hooks/create-app';

export const YourAppsCard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const isTabletM = useMediaQuery(theme.breakpoints['--tablet-m']);
  const { t } = useTranslation();
  const { appList } = useDashboard()
  const [isLoading, setLoading] = useState(true);
  const [isOpenDownloadModal, setOpenDownloadModal] = useState(false);
  const {
    setAppIcon,
    setAppName,
    clearValues,
  } = useCreateApp();
  const { isAuth } = useAuth();

  const handleEditButtonClick = (appItem: TAppItem) => () => {
    if (isMobile) {
      navigate(`/${PATHS.YOUR_APPS}/${PATHS.EDIT}/${PATHS.MENU}`, {
        relative: 'path',
        state: {
          widgetId: appItem?.wid,
        },
      });
    } else {
      navigate(`/${PATHS.YOUR_APPS}/${PATHS.EDIT}`, {
        relative: 'path',
        state: {
          widgetId: appItem?.wid,
        },
      });
    }
  };

  const handleCreateApp = () => {
    clearValues();
    navigate(`/${PATHS.CREATE_APP}`, {
      relative: 'path',
    });
  };

  const handleSeeAll = () => {
    navigate(`/${PATHS.YOUR_APPS}`, {
      relative: 'path',
    });
  };
  const handleCloseDownloadModal = () => {
    setOpenDownloadModal(false);

    navigate(`/${PATHS.MAIN}?download=1`, { relative: 'path' });

    clearValues();
  };
  const handleOnDownload = (appItem: TAppItem) => async () => {
    if (appItem.wid) {
      setAppName(appItem.caption)
      setAppIcon(
        `${getBuildEnvVar(
          'API_BASE_PATH',
        )}/geticon.php?wid=${appItem.wid}`,
      );
    }
    if (isAuth) {
      setOpenDownloadModal(true);
    } else {
      window.location.assign(
        `${getBuildEnvVar('API_BASE_PATH')}/login?returl=https://${window.location.hostname}/dashboard`,
      );
    }
  };
  useEffect(() => {
    if (appList) {
      setLoading(false)
    }
  }, [appList])
  return (
    <>
      <DownloadModal open={isOpenDownloadModal} onClose={handleCloseDownloadModal} width={608} />
      <MainCard
        header='Your apps'
        controls={
          !isLoading && (
            <ControlsWrapper $isTabletM={!isTabletM} $isMobile={isMobile}>
              {!isMobile && (
                <Button width={!isTabletM ? '100%' : 250} variant='secondary' onClick={handleSeeAll}>
                  {t('see-all')}
                </Button>
              )}
              <Button
                width={!isTabletM ? '100%' : 250}
                variant={isMobile ? 'secondary' : 'primary'}
                onClick={handleCreateApp}
              >
                {t('create-app')}
              </Button>
            </ControlsWrapper>
          )
        }
        isMobile={isMobile}
        linkText={t('see-all')}
        onLinkClick={handleSeeAll}
      >
        {isLoading && (
          <CircularProgressWrapper>
            <CircularProgress />
          </CircularProgressWrapper>
        )}
        {!isLoading &&
          appList
            ?.filter((_, index) => index < 5)
            ?.map((app) => (
              <AppItem
                key={app.wid}
                appName={app.caption}
                isMobile={isMobile}
                icon={
                  <img
                    src={`${getBuildEnvVar('API_BASE_PATH')}/geticon.php?widget=${app.name
                      }&c=${getCurrentUnixTime()}`}
                    width={56}
                    height={56}
                  />
                }
                bgColor='lightSilver'
                containerStyles={isMobile ? { padding: '16px 0 8px', height: '80px' } : {}}
                onEditButtonClick={handleEditButtonClick(app)}
                onDownloadButtonClick={handleOnDownload(app)}

              />
            ))}
      </MainCard>
    </>
  );
};
