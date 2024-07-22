import { useMediaQuery } from '@mui/material';
import { ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useTour } from '@reactour/tour';
import { ReloadIcon } from '~assets/icons/button/Reload';
import { AppIcon } from '~components/AppIcon/AppIcon';
import Button from '~components/buttons/Button/Button';
import SquareButton from '~components/buttons/SquareButton/SquareButton';
import { LabelSize, LabelVariants } from '~components/Label/types';
import { PageTitle } from '~components/PageTitle';
import { ProgressBar } from '~components/ProgressBar/ProgressBar';
import { PATHS } from '~constants/paths';
import { useSaveOneSignalAppId } from '~hooks/api/dashboard';
import { useSendPluginsEmail } from '~hooks/api/email';
import { TColorTheme, useCreateApp } from '~hooks/create-app';
import {
  useAuth,
  useCreateWebsiteApp,
  useEditWebsiteApp,
  useEditWebsiteAppTabs,
} from '~hooks/index';
import { getBuildEnvVar } from '~utils/env';
import { getBase64 } from '~utils/files';
import { getRandomAppIcon } from '~utils/icons';

import { BuildAppLayout } from '../../../containers/Layouts/BuildAppLayout/BuildAppLayout';
import { Pages } from '../../../containers/Layouts/BuildAppLayout/constants';
import { PreviewModal } from '../../../containers/PreviewModal/PreviewModal';
import { BuyPremiumModal } from '../../BuyPremiumModal';
import { DownloadModal } from '../../DownloadModal/DownloadModal';
import { ColorButtons, ColorPaletteButtons } from './constants';
import {
  AppIconWrapper,
  ColorsGrid,
  Controls,
  MainBlock,
  MainBlockSubtitle,
  MainBlockTitle,
  ProgressWrapper,
  ReloadButton,
  UploadBlock,
} from './styles';
import { useMixpanel } from 'react-mixpanel-browser';
import { CUSTOMIZESTEPS } from '~constants/tourSteps/customizeSteps';
import { FEATURESTEPS } from '~constants/tourSteps/featuresSteps';
import { DOWNLOADSTEPS } from '~constants/tourSteps/downloadSteps';

const progressBarValue = 25;

export const Customization = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    setAppIcon,
    setColorTheme,
    clearValues,
    acid,
    url,
    whatsApp,
    facebook,
    twitter,
    youtube,
    blog,
    map,
    appLayoutView,
    actionBar,
    appName,
    appIcon,
    colorTheme,
    email,
    plugins,
    multisubmitToken,
  } = useCreateApp();
  const { isAuth, firstVisit } = useAuth();
  const createWebsiteApp = useCreateWebsiteApp();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const isTabletL = useMediaQuery(theme.breakpoints['--tablet-l']);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [isOpenDownloadModal, setOpenDownloadModal] = useState(false);
  const [isOpenPremiumModal, setOpenPremiumModal] = useState(false);
  const [isNextStep, setNextStep] = useState(false);
  const [isPreviewModal, setPreviewModal] = useState(false);
  const [isPremiumShown, setIsPremiumShown] = useState(false);
  const [isPreviewShown, setIsPreviewShown] = useState(false);
  const editWebsiteApp = useEditWebsiteApp();
  const editWebsiteAppTabs = useEditWebsiteAppTabs();
  const sendPluginsEmail = useSendPluginsEmail();
  const saveOneSignalAppId = useSaveOneSignalAppId();
  const mixpanel = useMixpanel()
  const { setIsOpen, setSteps, isOpen, setCurrentStep } = useTour()

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

  const handleCloseDownloadModal = () => {
    setOpenDownloadModal(false);

    navigate(`/${PATHS.MAIN}?download=1`, { relative: 'path' });

    clearValues();
  };

  const handleClosePremiumModal = async () => {
    setOpenPremiumModal(false);

    if (isMobile) {
      if (!isPreviewShown) {
        setPreviewModal(true);
        setIsPreviewShown(true);
      } else {
        navigate(`/${PATHS.CREATE_APP}/${PATHS.FEATURE}`, {
          relative: 'path',
          state: {
            widgetId,
          },
        });
      }
    } else {
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

        navigate(`/${PATHS.YOUR_APPS}?edit=1`, { relative: 'path', state: {} });
      } else {
        navigate(`/${PATHS.CREATE_APP}/${PATHS.FEATURE}`, {
          relative: 'path',
          state: {
            widgetId,
          },
        });
      }
    }
  };

  const handleOnBuildApp = async () => {
    setIsOpen(false)
    mixpanel.track('Cr2BildappButton')
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

  const handleReloadIconClick = () => {
    mixpanel.track('Cr2RandomeIcon')
    setAppIcon(getRandomAppIcon());
  };

  const handleUploadFile: ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      if (event?.target?.files?.[0]) {
        const result = await getBase64(event.target.files[0]);
        setAppIcon(result);
        mixpanel.track('Cr2UploadIcon')
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleColorChange = useCallback(
    (theme: TColorTheme) => () => {
      mixpanel.track('Cr2ColorChose')
      setColorTheme(theme);
    },
    [setColorTheme],
  );

  const ColorButtonsList = useMemo(
    () =>
      ColorButtons.map(({ id, text, backgroundColor }) => (
        <SquareButton
          checked={id === colorTheme.id}
          key={id}
          backgroundColor={backgroundColor}
          onClick={handleColorChange({ id, text, backgroundColor })}
        >
          {t(text as 'customization')}
        </SquareButton>
      )),
    [colorTheme.id, handleColorChange, t],
  );

  useEffect(() => {
    if (!appIcon) {
      setAppIcon(getRandomAppIcon());
    }
  }, [appIcon, setAppIcon]);

  const handleNextStep = (isNextStep: boolean) => {
    setIsOpen(false)
    // @ts-ignore
    setSteps(FEATURESTEPS)
    setCurrentStep(0)
    mixpanel.track('Cr2ButtonNext')
    setNextStep(isNextStep);
    handleClosePremiumModal();
  };

  const handleClosePreviewModal = () => {
    setPreviewModal(false);
  };

  const handleDownload = () => {
    setPreviewModal(false);
    handleOnBuildApp();
  };

  const handleContinueEdit = () => {
    if (widgetId) {
      navigate(`/${PATHS.YOUR_APPS}/${PATHS.EDIT}/${PATHS.FEATURE}`, {
        relative: 'path',
        state: {
          widgetId,
        },
      });
    } else {
      navigate(`/${PATHS.CREATE_APP}/${PATHS.FEATURE}`, { relative: 'path' });
    }
  };

  const navigateToPrev = () => {
    navigate(`/${PATHS.CREATE_APP}`, {
      relative: 'path',
      state: {
        widgetId,
      },
    });
  };

  const navigateToNext = () => {
    setIsOpen(false)
    // @ts-ignore
    setSteps(FEATURESTEPS)
    setCurrentStep(0)
    navigate(`/${PATHS.CREATE_APP}/${PATHS.FEATURE}`, {
      relative: 'path',
      state: {
        widgetId,
      },
    });
  };
  useEffect(() => {
    if (isAuth && firstVisit) {
      // @ts-ignore
      setSteps(CUSTOMIZESTEPS);
      setIsOpen(true)
    }

  }, [isAuth, firstVisit])


  return (
    <>
      {isMobile && (
        <PreviewModal
          onEdit={handleContinueEdit}
          onDownload={handleDownload}
          open={isPreviewModal}
          onClose={handleClosePreviewModal}
        />
      )}
      <DownloadModal open={isOpenDownloadModal} onClose={handleCloseDownloadModal} width={608} />
      <BuyPremiumModal open={isOpenPremiumModal} onClose={handleClosePremiumModal} />
      <BuildAppLayout
        currentScreen={Pages.CUSTOMIZATION}
        step={2}
        progressBarValue={progressBarValue}
      >
        <PageTitle
          isMobile={isMobile}
          title={t('customization')}
          subtitle={!isMobile && !widgetId ? t('lets-make-app') : undefined}
          onBeforeButtonClick={navigateToPrev}
        />
        <MainBlock $isMobile={isMobile}>
          <div>
            <MainBlockTitle variant='m-700'>{t('app-icon')}</MainBlockTitle>
            <MainBlockSubtitle variant='m-400' color='middleGrey'>
              {t('app-icon-description')}
            </MainBlockSubtitle>
            <AppIconWrapper $isMobile={isMobile}>
              <AppIcon
                icon={appIcon ? <img src={appIcon} width={56} height={56} /> : null}
                text={appName}
              />
              {isMobile && (
                <div className='first-step'>
                  <ReloadButton
                    size={LabelSize.small}
                    variant={LabelVariants.secondary}
                    icon={<ReloadIcon />}
                    onClick={handleReloadIconClick}
                    $isMobile={isMobile}
                  />
                </div>
              )}
            </AppIconWrapper>
            <UploadBlock>
              {!isMobile && (
                <div className='first-step'>
                  <ReloadButton
                    variant={LabelVariants.secondary}
                    icon={<ReloadIcon />}
                    onClick={handleReloadIconClick}
                    $isMobile={isMobile}
                  />
                </div>
              )}
              <input
                ref={uploadInputRef}
                color='primary'
                accept='image/*'
                type='file'
                onChange={handleUploadFile}
                hidden={true}
              />
              <Button
                className='second-step'
                onClick={() => uploadInputRef?.current?.click?.()}
                variant={'secondary'}
                width={isMobile ? '100%' : 213}
              >
                {t('upload-icon')}
              </Button>
            </UploadBlock>
          </div>
          <div>
            <MainBlockTitle variant='m-700'>{t('color-theme')}</MainBlockTitle>
            <MainBlockSubtitle variant='m-400' color='middleGrey'>
              {t('app-icon-description')}
            </MainBlockSubtitle>
            <ColorsGrid className='third-step' $isTabletL={isTabletL} $isMobile={isMobile}>
              {ColorButtonsList}
            </ColorsGrid>
            {isMobile && !widgetId && (
              <ProgressWrapper>
                <ProgressBar value={progressBarValue} backgroundColor='background' />
              </ProgressWrapper>
            )}
          </div>
        </MainBlock>
        <Controls $isMobile={isMobile}>
          <Button
            // disabled={!!isOpen}
            className='step4'
            onClick={() => { handleOnBuildApp(); mixpanel.track('Cr2BildappButton') }}
            variant={'secondary'}
            width={'100%'}
            loading={!isNextStep && isLoading}
          >
            {t('build-app')}
          </Button>
          <Button
            // disabled={!!isOpen}
            className='fifth-step'
            onClick={isPremiumShown && isPreviewShown ? navigateToNext : () => handleNextStep(true)}
            width={'100%'}
            loading={isNextStep && isLoading}
          >
            {t(widgetId ? 'save' : 'next-step')}
          </Button>
        </Controls>
      </BuildAppLayout>
    </>
  );
};
