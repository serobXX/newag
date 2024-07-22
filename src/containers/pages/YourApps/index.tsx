import { useMediaQuery } from '@mui/material';
import { ComponentProps, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import ClockDesctop from '~assets/img/banners/clock-desktop.png';
import ClockMobile from '~assets/img/banners/clock-mobile.png';
import TargetDesktop from '~assets/img/banners/target-desktop.png';
import TargetMobile from '~assets/img/banners/target-mobile.png';
import { AppItem } from '~components/AppItem';
import { Banner } from '~components/Banner';
import Button from '~components/buttons/Button/Button';
import { CircularProgress } from '~components/CircularProgress/CircularProgress';
import { PageTitle } from '~components/PageTitle';
import { Pagination } from '~components/Pagination';
import { Snackbar } from '~components/Snackbar';
import { PATHS } from '~constants/paths';
import { useAppList } from '~hooks/api/dashboard';
import { useAuth } from '~hooks/auth';
import { TAppItem } from '~hooks/dashboard';
import { getCurrentUnixTime } from '~utils/dates';
import { getBuildEnvVar } from '~utils/env';
import { getQueryParamByName } from '~utils/query';

import { BuyPremiumModal } from '../../BuyPremiumModal';
import {
  BannersWrapper,
  BlockWrapper,
  ButtonWrapper,
  CircularProgressWrapper,
  Container,
  ContentWrapper,
  PaginationWrapper,
} from './styles';
import { useCreateApp } from '~hooks/create-app';
import { DownloadModal } from '../../DownloadModal/DownloadModal';
import { useTour } from '@reactour/tour';

const ITEMS_COUNT_IN_PAGE = 10;

export const YourApps = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const isTabletM = useMediaQuery(theme.breakpoints['--tablet-m']);
  const appListQuery = useAppList();
  const [appList, setAppList] = useState<TAppItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDownloadModal, setOpenDownloadModal] = useState(false);
  const { isPremium } = useAuth();
  const blockWrapperRef = useRef<HTMLDivElement>(null);

  const isShowSnackBar = !!getQueryParamByName('edit');
  const { setCurrentStep, currentStep, setIsOpen } = useTour()
  const {
    setAppIcon,
    setAppName,
    clearValues,
  } = useCreateApp();
  const { isAuth } = useAuth();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOnChangePage: ComponentProps<typeof Pagination>['onChange'] = (_, page) => {
    setCurrentPage(page);
  };

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

  const handleReadMore = () => {
    navigate(`/${PATHS.PUBLISH}`, {
      relative: 'path',
      state: {
        from: PATHS.MAIN,
      },
    });
  };

  const filteredAppList = useMemo(
    () =>
      appList?.filter((_, index) =>
        currentPage == 1
          ? index < ITEMS_COUNT_IN_PAGE
          : index > ITEMS_COUNT_IN_PAGE * (currentPage - 1) - 2 &&
          index < ITEMS_COUNT_IN_PAGE * currentPage - 1,
      ),
    [appList, currentPage],
  );
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
    if (currentStep == 3) {
      setCurrentStep(3)
      setIsOpen(false)
      navigate(`/${PATHS.MAIN}`)
    }
  }, [currentStep])

  useEffect(() => {
    appListQuery.mutateAsync().then((response) => {
      setAppList(response?.widgetsArray);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DownloadModal open={isOpenDownloadModal} onClose={handleCloseDownloadModal} width={608} />
      <BuyPremiumModal open={isModalOpen} onClose={handleModalClose} />
      <Container $isMobile={isMobile}>
        <Snackbar
          open={isShowSnackBar}
          message={t('edited')}
          offsetY={isMobile ? 16 : 30}
          container={blockWrapperRef}
          horizontalMargin={isMobile ? 16 : 0}
        />
        <BlockWrapper $isMobile={isMobile} ref={blockWrapperRef}>
          <PageTitle
            isBeforeButton={false}
            isMobile={isMobile}
            title={t('your-apps')}
            onBeforeButtonClick={() => { }}
          />
          <ContentWrapper $isMobile={isMobile}>
            {isLoading && (
              <CircularProgressWrapper>
                <CircularProgress />
              </CircularProgressWrapper>
            )}
            {!isLoading && !!filteredAppList?.length && (
              <>
                <AppItem
                  appName={filteredAppList?.[0]?.caption}
                  isMobile={isMobile}
                  icon={
                    <img
                      src={`${getBuildEnvVar('API_BASE_PATH')}/geticon.php?widget=${filteredAppList?.[0]?.name
                        }&c=${getCurrentUnixTime()}`}
                      width={56}
                      height={56}
                    />
                  }
                  onDownloadButtonClick={handleOnDownload(filteredAppList?.[0])}
                  onEditButtonClick={handleEditButtonClick(filteredAppList?.[0])}
                />
                {isMobile && (
                  <ButtonWrapper>
                    <Button width='100%'>{t('create-app')}</Button>
                  </ButtonWrapper>
                )}
                <BannersWrapper $isTabletM={!isTabletM}>
                  {!isPremium && (
                    <Banner
                      title='Premium sale'
                      subtitle='Complete all steps to start using app'
                      buttonText='Get Premium'
                      bgColor='supportiveKrillin100'
                      buttonBgColor='supportiveWhis100'
                      bgImage={isMobile ? ClockMobile : ClockDesctop}
                      onButtonClick={handleModalOpen}
                      innerStyles={
                        isMobile
                          ? { backgroundPositionX: '105%', backgroundPositionY: '-105%' }
                          : {}
                      }
                      isMobile={isMobile}
                    />
                  )}
                  {!isMobile && (
                    <Banner
                      title='Publish promo'
                      subtitle='Complete all steps to start using app'
                      buttonText='Read more'
                      bgColor='unaIrradiatedGreen'
                      buttonBgColor='piccolo'
                      bgImage={isMobile ? TargetMobile : TargetDesktop}
                      onButtonClick={handleReadMore}
                      isMobile={isMobile}
                    />
                  )}
                </BannersWrapper>
                {filteredAppList
                  ?.filter((_, index) => index > 0)
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
                      onDownloadButtonClick={handleOnDownload(app)}
                      onEditButtonClick={handleEditButtonClick(app)}
                    />
                  ))}
              </>
            )}
          </ContentWrapper>
          {!isMobile && !isLoading && (
            <PaginationWrapper>
              <Pagination
                count={Math.ceil(appList?.length / ITEMS_COUNT_IN_PAGE)}
                page={currentPage}
                onChange={handleOnChangePage}
              />
            </PaginationWrapper>
          )}
        </BlockWrapper>
      </Container>
    </>
  );
};
