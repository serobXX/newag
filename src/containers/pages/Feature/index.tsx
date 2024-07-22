import { useMediaQuery } from '@mui/material';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { BlogIcon } from '~assets/icons/feature/BlogIcon';
import { FacebookIcon } from '~assets/icons/feature/Facebook';
import { MapIcon } from '~assets/icons/feature/Map';
import { WhatsUpIcon } from '~assets/icons/feature/WhatsUp';
import { XIcon } from '~assets/icons/feature/X';
import { YoutubeIcon } from '~assets/icons/feature/Youtube';
import Button from '~components/buttons/Button/Button';
import { FeatureItem } from '~components/FeatureItem';
import { Modal } from '~components/Modal';
import { PageTitle } from '~components/PageTitle';
import { ProgressBar } from '~components/ProgressBar/ProgressBar';
import { RadioGroup } from '~components/RadioGroup';
import { PATHS } from '~constants/paths';
import { useSaveOneSignalAppId } from '~hooks/api/dashboard';
import { useSendPluginsEmail } from '~hooks/api/email';
import { TAppLayoutView, useCreateApp } from '~hooks/create-app';
import {
  useAuth,
  useCreateWebsiteApp,
  useEditWebsiteApp,
  useEditWebsiteAppTabs,
} from '~hooks/index';
import { getBuildEnvVar } from '~utils/env';
import { useTour } from '@reactour/tour';
import { BuildAppLayout } from '../../../containers/Layouts/BuildAppLayout/BuildAppLayout';
import { Pages } from '../../../containers/Layouts/BuildAppLayout/constants';
import { DownloadModal } from '../../DownloadModal/DownloadModal';
import { ColorPaletteButtons } from '../Customization/constants';
import { ActionBarOptions, LayoutViewOptions } from './constants';
import { BlogForm } from './forms/BlogForm';
import { FacebookForm } from './forms/FacebookForm';
import { MapForm } from './forms/MapForm';
import { TwitterForm } from './forms/TwitterForm';
import { WhatsAppForm } from './forms/WhatsAppForm';
import { YouTubeForm } from './forms/YouTubeForm';
import { Controls, Header, MainBlock, ProgressWrapper } from './styles';
import { useMixpanel } from 'react-mixpanel-browser';
import { FEATURESTEPS } from '~constants/tourSteps/featuresSteps';
import { PLUGINSTEPS } from '~constants/tourSteps/pluginSteps';
import { DOWNLOADSTEPS } from '~constants/tourSteps/downloadSteps';
import { afterCreateQuizList } from '../../../containers/QuizModal/constants';
import { QuizModal } from '../../../containers/QuizModal/QuizModal';

const progressBarValue = 50;

export const Feature = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const {
    acid,
    url,
    appIcon,
    appName,
    colorTheme,
    email,
    whatsApp,
    facebook,
    twitter,
    youtube,
    blog,
    map,
    appLayoutView,
    actionBar,
    plugins,
    multisubmitToken,
    clearValues,
    setActionBar,
    setAppLayoutView,
  } = useCreateApp();
  const { isAuth, firstVisit } = useAuth();
  const createWebsiteApp = useCreateWebsiteApp();
  const editWebsiteApp = useEditWebsiteApp();
  const editWebsiteAppTabs = useEditWebsiteAppTabs();
  const sendPluginsEmail = useSendPluginsEmail();
  const saveOneSignalAppId = useSaveOneSignalAppId();
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenDownloadModal, setOpenDownloadModal] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [isNextStep, setNextStep] = useState(false);
  const mixpanel = useMixpanel()
  const { setIsOpen, setSteps, setCurrentStep } = useTour()
  const isLoading =
    createWebsiteApp.isLoading ||
    editWebsiteApp.isLoading ||
    editWebsiteAppTabs.isLoading ||
    sendPluginsEmail.isLoading ||
    saveOneSignalAppId.isLoading;
  const widgetId = location.state?.widgetId as string;
  const formattedPlugins = Object.values(plugins)
    .filter((value) => !!value && !value.oneSignalAppId)
    .map((value) => value?.text ?? '');

  const handleLayoutViewChange = (_: ChangeEvent, value: string) => {
    setAppLayoutView(value as TAppLayoutView);
    mixpanel.track('Cr3AppLayoutChange')
  };

  const handleActionBarChange = (_: ChangeEvent, value: string) => {
    setActionBar(value === 'yes');
    mixpanel.track('Cr3ActionBarChange')
  };

  const handleCloseModal = () => {
    if (isAuth && firstVisit) {
      setIsOpen(true)

    }
    setOpenModal(false);
  };

  const handleCloseDownloadModal = () => {
    setOpenDownloadModal(false);

    navigate(`/${PATHS.MAIN}?download=1`, { relative: 'path' });

    clearValues();
  };

  const handleEditButtonClick = (id: number, mixpanelvalue: string) => {
    setIsOpen(false)
    mixpanel.track(mixpanelvalue)
    setOpenModal(true);
    setActiveId(id - 1);
  };

  const handleOnBuildApp = async () => {
    handleNextStep(false);
    setIsOpen(false)
    if (widgetId) {
      await editWebsiteApp.mutateAsync({
        url,
        appIcon,
        name: `${appName}_${widgetId}`,
        appName,
        color: ColorPaletteButtons[colorTheme.id as keyof typeof ColorPaletteButtons],
        description: '',
        widgetId,
        multisubmitToken,
      });
      await editWebsiteAppTabs.mutateAsync({ actionBar, appLayoutView, acid });

      if (formattedPlugins.length) {
        await sendPluginsEmail.mutateAsync({ email, plugins: formattedPlugins });
      }

      if (plugins?.['One signal']?.oneSignalAppId) {
        await saveOneSignalAppId.mutateAsync({
          userOneSignalId: plugins['One signal'].oneSignalAppId,
          saveOneSignalId: '1',
        });
      }
    } else {
      await createWebsiteApp.mutateAsync({
        url,
        whatsApp,
        facebook,
        twitter,
        youtube,
        blog,
        map,
        appLayoutView,
        actionBar,
        color: ColorPaletteButtons[colorTheme.id as keyof typeof ColorPaletteButtons],
        appIcon,
        appName,
        email:
          !isAuth && getBuildEnvVar('SEND_EMAIL_FOR_UNAUTHORIZED_USER') === 'true' ? email : '',
      });

      if (formattedPlugins.length) {
        await sendPluginsEmail.mutateAsync({ email, plugins: formattedPlugins });
      }
    }

    if (isAuth) {
      setOpenDownloadModal(true);
      if (firstVisit) {
        setIsOpen(true)
        // @ts-ignore
        setTimeout(() => setSteps(DOWNLOADSTEPS), 800)
        setCurrentStep(0)
      }
    } else {
      localStorage.beforeAuth = JSON.stringify({
        url,
        whatsApp,
        facebook,
        twitter,
        youtube,
        blog,
        map,
        appLayoutView,
        actionBar,
        color: ColorPaletteButtons[colorTheme.id as keyof typeof ColorPaletteButtons],
        appIcon,
        appName,
        email:
          !isAuth && getBuildEnvVar('SEND_EMAIL_FOR_UNAUTHORIZED_USER') === 'true' ? email : '',
      })
      window.location.assign(
        `${getBuildEnvVar('API_BASE_PATH')}/login?returl=https://${window.location.hostname}/dashboard`,
      );
    }
  };

  // const onSubmit = async () => {
  //   //@ts-ignore
  //   setSteps(PLUGINSTEPS)
  //   setCurrentStep(0)
  //   handleNextStep(true);

  //   if (widgetId && !isMobile) {
  //     await editWebsiteApp.mutateAsync({
  //       url,
  //       appIcon,
  //       name: `${appName}_${widgetId}`,
  //       appName,
  //       color: ColorPaletteButtons[colorTheme.id as keyof typeof ColorPaletteButtons],
  //       description: '',
  //       widgetId,
  //       multisubmitToken,
  //     });
  //     await editWebsiteAppTabs.mutateAsync({ actionBar, appLayoutView, acid });

  //     if (formattedPlugins.length) {
  //       await sendPluginsEmail.mutateAsync({ email, plugins: formattedPlugins });
  //     }

  //     navigate(`/${PATHS.YOUR_APPS}?edit=1`, { relative: 'path', state: {} });
  //   } else {
  //     navigate(
  //       `${widgetId ? `/${PATHS.YOUR_APPS}/${PATHS.EDIT}` : `/${PATHS.CREATE_APP}`}/${PATHS.PLUGINS
  //       }`,
  //       {
  //         relative: 'path',
  //         state: {
  //           widgetId,
  //         },
  //       },
  //     );
  //   }
  // };

  const handleNextStep = (isNextStep: boolean) => {
    setNextStep(isNextStep);
  };

  const navigateToPrev = () => {
    navigate(`/${PATHS.CREATE_APP}/${PATHS.CUSTOMIZATION}`, {
      relative: 'path',
      state: {
        widgetId,
      },
    });
  };

  const FeaturesList = useMemo(
    () => [
      {
        id: 1,
        text: 'WhatsApp',
        icon: <WhatsUpIcon />,
        value: whatsApp?.number,
        content: <WhatsAppForm onSubmit={handleCloseModal} />,
        mixpanelvalue: 'Cr3WhatsAppWindow'
      },
      {
        id: 2,
        text: 'Facebook',
        icon: <FacebookIcon />,
        value: facebook?.url,
        content: <FacebookForm onSubmit={handleCloseModal} />,
        mixpanelvalue: 'Cr3FacebookWindow'
      },
      {
        id: 3,
        text: 'X',
        icon: <XIcon />,
        value: twitter?.url,
        content: <TwitterForm onSubmit={handleCloseModal} />,
        mixpanelvalue: 'Cr3XWindow'
      },
      {
        id: 4,
        text: 'YouTube',
        icon: <YoutubeIcon />,
        value: youtube?.url,
        content: <YouTubeForm onSubmit={handleCloseModal} />,
        mixpanelvalue: 'Cr3YouTubeWindow'
      },
      {
        id: 5,
        text: 'Blog',
        icon: <BlogIcon />,
        value: blog?.url,
        content: <BlogForm onSubmit={handleCloseModal} />,
        mixpanelvalue: 'Cr3BlogWindow'
      },
      {
        id: 6,
        text: 'Map',
        icon: <MapIcon />,
        value: map?.html,
        content: <MapForm onSubmit={handleCloseModal} />,
        mixpanelvalue: 'Cr3MapWindow'
      },
    ],
    [blog?.url, facebook?.url, map?.html, twitter?.url, whatsApp?.number, youtube?.url],
  );
  useEffect(() => {
    if (isAuth && firstVisit) {
      // @ts-ignore
      setSteps(FEATURESTEPS);
      setIsOpen(true)
    }

  }, [isAuth, firstVisit])

  return (
    <>
      <DownloadModal open={isOpenDownloadModal} onClose={handleCloseDownloadModal} width={608} />
      <Modal
        titleSlotContent={
          <Header Component='h2' variant={isMobile ? 'large' : 'super-large'} $isMobile={isMobile}>
            {FeaturesList[activeId].text}
          </Header>
        }
        open={isOpenModal}
        onClose={handleCloseModal}
        width={608}
        margin={isMobile ? '0' : undefined}
        padding={isMobile ? '0 16px' : undefined}
      >
        {FeaturesList[activeId].content}
      </Modal>
      <BuildAppLayout currentScreen={Pages.FEATURE} step={3} progressBarValue={progressBarValue}>
        <PageTitle
          isMobile={isMobile}
          title={t('feature')}
          subtitle={widgetId ? '' : t('app-icon-description')}
          onBeforeButtonClick={navigateToPrev}
        />
        <MainBlock $isMobile={isMobile}>
          <div className='first-step'>
            {!widgetId &&
              FeaturesList.map(({ id, ...rest }, index, array) => (
                <FeatureItem
                  key={id}
                  id={id}
                  isFirst={index === 0}
                  isLast={index === array.length - 1}
                  onAddButtonClick={handleEditButtonClick}
                  onEditButtonClick={handleEditButtonClick}
                  {...rest}
                />
              ))}
          </div>
          <div className='second-step'>
            <RadioGroup
              name='layout-view'
              label='App layout view'
              options={LayoutViewOptions}
              value={appLayoutView}
              onChange={handleLayoutViewChange}
            />
          </div>
          <div className='third-step'>
            <RadioGroup
              name='action-bar'
              label='Action bar'
              options={ActionBarOptions}
              value={actionBar ? 'yes' : 'no'}
              onChange={handleActionBarChange}
            />
          </div>
          {isMobile && !widgetId && (
            <ProgressWrapper>
              <ProgressBar value={progressBarValue} backgroundColor='background' />
            </ProgressWrapper>
          )}
        </MainBlock>
        <Controls $isMobile={isMobile}>
          <Button
            loading={false}
            onClick={handleOnBuildApp}
            variant={'secondary'}
            width={'100%'}
          >
            {t('build-app')}
          </Button>
          <Button className='fourth-step' loading={!isNextStep && isLoading} onClick={handleOnBuildApp} width={'100%'}>
            {t(widgetId ? 'save' : 'download')}
          </Button>
        </Controls>
      </BuildAppLayout>
    </>
  );
};
