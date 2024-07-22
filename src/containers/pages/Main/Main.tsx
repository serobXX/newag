import { useMediaQuery } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import ClockDesktop from '~assets/img/banners/clock-desktop.png';
import ClockMobile from '~assets/img/banners/clock-mobile.png';
import TargetDesktop from '~assets/img/banners/target-desktop.png';
import TargetMobile from '~assets/img/banners/target-mobile.png';
import { Banner } from '~components/Banner';
import { BannerWithCountdown } from '~components/BannerWithCountdown';
import { PageTitle } from '~components/PageTitle';
import { Snackbar } from '~components/Snackbar';
import { PATHS } from '~constants/paths';
import { useAuth } from '~hooks/auth';
import { getQueryParamByName } from '~utils/query';
import { BuyPremiumModal } from '../../BuyPremiumModal';
import { PremiumCard } from './cards/PremiumCard';
import { PublishCard } from './cards/PublishCard';
import { YourAppsCard } from './cards/YourAppsCard';
import { BannersWrapper, BannerWithCountdownWrapper, BlockWrapper, Container } from './styles';
import { useAppList, useGamification } from '~hooks/api/dashboard';
import { useCreateWebsiteApp } from '~hooks/index';
import { IappList } from '../../../service/dashboard';
import { useDashboard } from '~hooks/dashboard';
import { useTour } from '@reactour/tour';
import { DASHBOARDMOBILESTEPS, DASHBOARDSTEPS } from '~constants/tourSteps/dashboardSteps';
import { GamificationCard } from './cards/GamificationCard';
import { GameBanner } from '~components/GameBanner';
import ProgressSteps from './ProgressSteps';
import GiftReward from '~components/GiftReward';
import { Modal } from '~components/Modal';
import { QuizModal } from '../../../containers/QuizModal/QuizModal';
import { afterCreateQuizList, afterPremiumQuizList } from '../../../containers/QuizModal/constants';

export const Main = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const appListQuery = useAppList();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const isTabletM = useMediaQuery(theme.breakpoints['--tablet-m']);
  const blockWrapperRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRewardOpen, setRewardOpen] = useState(false)
  const [startDate, setNewStartDate] = useState('');
  const [startReward, setNewStartReward] = useState('');
  const { isAuth, firstVisit } = useAuth();
  const [reward, setReward] = useState('')
  const createWebsiteApp = useCreateWebsiteApp();
  const [isOpenQuizModal, setOpenQuizModal] = useState(false);
  const {
    isPremium,
    premium: { data },
  } = useAuth();
  const { setIsOpen, setSteps, setCurrentStep, isOpen, currentStep, steps } = useTour()
  const isShowSnackBar = !!getQueryParamByName('download');
  const isDownloadRoute = !!getQueryParamByName('download');
  const isPremiumRoute = !!getQueryParamByName('premium');

  const {
    appList,
    setAppList,
    gameData,
    setGameData,
    currentLevel,
    nextLevel,
    isEnabledQuiz
  } = useDashboard();
  const gameQuery = useGamification()

  const handleModalOpen = () => {
    setIsOpen(false)
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (firstVisit && isDownloadRoute && isEnabledQuiz) {
      setOpenQuizModal(true)
      setIsOpen(false)
    }
    if (currentLevel.level == 2) {
      setRewardOpen(true)
      setReward('pdf')
    }
    if (isPremiumRoute) {
      window.location.reload()
    }
  };

  const handleReadMore = () => {
    setIsOpen(false)
    navigate(`/${PATHS.PUBLISH}`, {
      relative: 'path',
      state: {
        from: PATHS.MAIN,
      },
    });
  };

  const handleCreateApp = () => {

    navigate(`/${PATHS.CREATE_APP}`, {
      relative: 'path',
    });

  };

  const openTour = () => {
    if (isAuth && firstVisit) {
      setIsOpen(true)
      currentStep == 4 && setCurrentStep(4)
      // @ts-ignore
      setTimeout(() => setSteps(isMobile ? DASHBOARDMOBILESTEPS : DASHBOARDSTEPS), 1000)
    }
  }

  useEffect(() => {

    if (isPremiumRoute && isPremium && isEnabledQuiz) {
      setOpenQuizModal(true)
    }

  }, [isPremiumRoute, isPremium])

  useEffect(() => {
    const initializeData = async () => {
      const resp = await gameQuery.mutateAsync(null)
      if (!resp?.missions_completed) {
        setNewStartReward(resp?.reward_date)
        setGameData({ ...resp, missions_completed: `[]` })
      } else {
        setNewStartReward(resp?.reward_date)
        setGameData(resp)
      }
      const beforeAuth = localStorage.beforeAuth;
      if (beforeAuth) {
        createWebsiteApp.mutateAsync(JSON.parse(beforeAuth)).then(() => {
          appListQuery.mutateAsync().then((response: IappList) => {
            setAppList(response?.widgetsArray);
            setNewStartDate(response.dashboardVisitedValue);
            localStorage.removeItem('beforeAuth')
          });
        })
      } else {
        appListQuery.mutateAsync().then((response: IappList) => {
          setAppList(response?.widgetsArray);
          setNewStartDate(response.dashboardVisitedValue);
        });
      }

    };
    initializeData();
  }, []);

  useEffect(() => {
    if (gameData.level == 4 && gameData.xp == 0) {
      setRewardOpen(true)
      setReward('discount')
    }
  }, [gameData.level])

  const calculateRemainingTime = useMemo(() => {
    const endTime = new Date(startDate);
    endTime.setHours(endTime.getHours() + 24);

    const timezoneOffset = new Date().getTimezoneOffset();
    endTime.setMinutes(endTime.getMinutes() - timezoneOffset);

    const currentTime = new Date();
    const remainingMilliseconds = Number(endTime) - Number(currentTime);

    return remainingMilliseconds <= 0 ? 0 : Math.floor(remainingMilliseconds / 1000);
  }, [startDate]);

  const [remainingSeconds, setRemainingSeconds] = useState(calculateRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingSeconds(calculateRemainingTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [calculateRemainingTime]);

  const calculateRemainingRewardTime = useMemo(() => {
    const endTime = new Date(startReward);
    endTime.setHours(endTime.getHours() + 24);

    const timezoneOffset = new Date().getTimezoneOffset();
    endTime.setMinutes(endTime.getMinutes() - timezoneOffset);

    const currentTime = new Date();
    const remainingMilliseconds = Number(endTime) - Number(currentTime);

    return remainingMilliseconds <= 0 ? 0 : Math.floor(remainingMilliseconds / 1000);
  }, [startReward]);

  const [remainingRewardSeconds, setRemainingRewardSeconds] = useState(calculateRemainingRewardTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingRewardSeconds(calculateRemainingRewardTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [calculateRemainingRewardTime]);


  useEffect(() => {
    if (!isPremium && isDownloadRoute) {
      setIsModalOpen(true)
    }
  }, [isDownloadRoute, appList.length])

  useEffect(() => {
    if (currentStep === steps?.length - 1) {
      localStorage.firstVisit = 1
    }
  }, [currentStep, steps])

  useEffect(() => {
    if (isModalOpen || isOpenQuizModal) {
      setIsOpen(false);
    } else {
      openTour()
    }
  }, [isModalOpen, isMobile, isOpenQuizModal])

  const handleOnClose = () => {
    setRewardOpen(false)
  }
  const handleCloseQuizModal = () => {
    setOpenQuizModal(false);
  };

  return (
    <>
      <Modal
        open={isRewardOpen}
        onClose={handleOnClose}
        width={600}
        height={600}
        padding={'0'}
        margin={isMobile ? '0' : undefined}
      >
        <GiftReward onClose={handleOnClose} reward={reward} />
      </Modal>
      <QuizModal list={isPremiumRoute ? afterPremiumQuizList : afterCreateQuizList} open={isOpenQuizModal} onClose={handleCloseQuizModal} width={608} />
      <BuyPremiumModal open={isModalOpen} onClose={handleModalClose} />
      <Container $isMobile={isMobile}>
        <Snackbar
          open={isShowSnackBar}
          message={t('download-start')}
          offsetY={isMobile ? 16 : 30}
          container={blockWrapperRef}
          horizontalMargin={isMobile ? 16 : 0}
        />
        <BlockWrapper $isMobile={isMobile}>
          <PageTitle
            isMobile={isMobile}
            title={t('hello')}
            isBeforeButton={false}
            padding={isMobile ? undefined : '0'}
          />
          {!isPremium && (!!remainingRewardSeconds || !!remainingSeconds) && (
            <BannerWithCountdownWrapper ref={blockWrapperRef} $isMobile={isMobile}>
              <BannerWithCountdown
                initialRestTime={remainingRewardSeconds ? remainingRewardSeconds : remainingSeconds}
                text={t('limited-offer')}
                offText={`${data.yearlyDiscount}% ${t('70-off')}`}
                buttonText={t('get-premium')}
                onButtonClick={handleModalOpen}
                isMobile={!isTabletM}
              />
            </BannerWithCountdownWrapper>
          )}
          <GamificationCard>
            <div className='step-4'>
              <BannersWrapper $isTabletM={!isTabletM}>
                <GameBanner
                  title='Current Level'
                  color='#36D78A'
                  subtitle={`Level ${currentLevel.level}:${currentLevel.name}`}
                  bgColor='goku'
                  buttonBgColor='supportiveWhis100'
                  bgImage={currentLevel.name}
                  onButtonClick={handleModalOpen}
                  innerStyles={
                    isMobile ? { backgroundPositionX: '115%', backgroundPositionY: '0' } : {}
                  }
                  isMobile={isMobile}
                />
                {
                  currentLevel.level !== 4 &&
                  <GameBanner
                    title='Next Level'
                    subtitle={`Level ${nextLevel?.level}:${nextLevel?.name}`}
                    color='#FFB319'
                    bgColor='goku'
                    buttonBgColor='supportiveWhis100'
                    bgImage={nextLevel.name}
                    onButtonClick={handleModalOpen}
                    innerStyles={
                      isMobile ? { backgroundPositionX: '115%', backgroundPositionY: '0' } : { filter: 'blur(10px)' }
                    }
                    isMobile={isMobile}
                  />
                }
              </BannersWrapper>
            </div>
            <ProgressSteps
              xp={gameData?.xp}
              currentLevel={currentLevel}
              isMobile={isMobile}
              openModal={handleModalOpen}
              subtitle='You need to complete all required steps below to proceed to next level'
            />
          </GamificationCard>
          <BannersWrapper $isTabletM={!isTabletM}>
            {!isPremium && (
              <Banner
                className='step-5'
                title='Premium sale'
                subtitle={`Achieve your goals with Premium Future! Accelerate your success with us`}
                buttonText='Get Premium'
                bgColor='supportiveKrillin100'
                buttonBgColor='supportiveWhis100'
                bgImage={isMobile ? ClockMobile : ClockDesktop}
                onButtonClick={handleModalOpen}
                innerStyles={
                  isMobile ? { backgroundPositionX: '115%', backgroundPositionY: '125%' } : {}
                }
                isMobile={isMobile}
              />
            )}
            {!isMobile && (
              <Banner
                className='step-6'
                title='Publish promo'
                subtitle='10 years of experience make us the best! Outpace competitors and earn faster with Premium Future!'
                buttonText='Read more'
                bgColor='unaIrradiatedGreen'
                buttonBgColor='piccolo'
                bgImage={isMobile ? TargetMobile : TargetDesktop}
                onButtonClick={handleReadMore}
                isMobile={isMobile}
              />
            )}
          </BannersWrapper>
          {isMobile && <PremiumCard />}
          <YourAppsCard />
          {isMobile && (
            <Banner
              title='Publish promo'
              subtitle='10 years of experience make us the best! Outpace competitors and earn faster with Premium Future!'
              buttonText='Read more'
              bgColor='goku'
              buttonBgColor='piccolo'
              bgImage={isMobile ? TargetMobile : TargetDesktop}
              onButtonClick={handleReadMore}
              isMobile={isMobile}
              innerStyles={{ border: '1px solid rgba(0, 0, 0, 0.10)' }}
            />
          )}
          <PublishCard
            onPublish={handleReadMore}
            onUpgradeToPremium={handleModalOpen}
            onHowToPublish={handleReadMore}
            onCreateApp={handleCreateApp}
          />
        </BlockWrapper>
      </Container>
    </>
  );
};
