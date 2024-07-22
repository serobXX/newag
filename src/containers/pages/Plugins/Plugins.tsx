import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { AccordionItem } from '~components/Accordion';
import Button from '~components/buttons/Button/Button';
import { PageTitle } from '~components/PageTitle';
import { ProgressBar } from '~components/ProgressBar/ProgressBar';
import { PATHS } from '~constants/paths';
import { useSaveOneSignalAppId } from '~hooks/api/dashboard';
import { useSendPluginsEmail } from '~hooks/api/email';
import { useCreateApp } from '~hooks/create-app';
import {
  useAuth,
  useCreateWebsiteApp,
  useEditWebsiteApp,
  useEditWebsiteAppTabs,
} from '~hooks/index';
import { TPlugin } from '~types/plugins';
import { getBuildEnvVar } from '~utils/env';
import { useTour } from '@reactour/tour';
import { BuildAppLayout } from '../../../containers/Layouts/BuildAppLayout/BuildAppLayout';
import { Pages } from '../../../containers/Layouts/BuildAppLayout/constants';
import { DownloadModal } from '../../DownloadModal/DownloadModal';
import { ColorPaletteButtons } from '../Customization/constants';
import { FeaturesList } from './constants';
import { OneSignalModal } from './modals/OneSignalModal';
import { Controls, MainBlock, ProgressWrapper } from './styles';
import { useMixpanel } from 'react-mixpanel-browser';
import { PLUGINSTEPS } from '~constants/tourSteps/pluginSteps';
import { DOWNLOADSTEPS } from '~constants/tourSteps/downloadSteps';
import { enableBodyScroll } from 'body-scroll-lock';

const progressBarValue = 75;

export const Plugins = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
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
    quizValues,
    setPlugins,
    clearValues,
  } = useCreateApp();
  const navigate = useNavigate();
  const { isAuth, firstVisit } = useAuth();
  const createWebsiteApp = useCreateWebsiteApp();
  const editWebsiteApp = useEditWebsiteApp();
  const editWebsiteAppTabs = useEditWebsiteAppTabs();
  const sendPluginsEmail = useSendPluginsEmail();
  const saveOneSignalAppId = useSaveOneSignalAppId();
  const [isOpenDownloadModal, setOpenDownloadModal] = useState(false);
  const [isOneSignalModalOpen, setIsOneSignalModalOpen] = useState(false);
  const { setIsOpen, setSteps, isOpen, steps, setCurrentStep } = useTour()
  const mixpanel = useMixpanel()
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

  const handlePriceButtonClick = (plugin: TPlugin) => () => {
    enableBodyScroll(document.body)
    mixpanel.track(plugin.mixpanelValue)
    if (plugins[plugin?.text]) {
      setPlugins((values) => ({ ...values, [plugin.text]: null }));
    } else {
      setPlugins((values) => ({ ...values, [plugin.text]: plugin }));
    }
  };

  const handleOneSignalModalOpen = () => {
    setIsOpen(false)
    setIsOneSignalModalOpen(true);
    mixpanel.track('Cr4OneSignalWindow')
  };

  const handleOneSignalModalClose = () => {
    if (isAuth && firstVisit) {
      setIsOpen(true)

    }
    setIsOneSignalModalOpen(false);
  };

  const handleOnDownload = async () => {
    setIsOpen(false)
    mixpanel.track('C3BildappButton')
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

      navigate(`/${PATHS.YOUR_APPS}?edit=1`, { relative: 'path' });
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
        quiz: quizValues
      });

      if (formattedPlugins.length) {
        await sendPluginsEmail.mutateAsync({ email, plugins: formattedPlugins });
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
    }
  };

  const navigateToPrev = () => {
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
      setSteps(PLUGINSTEPS);
      setIsOpen(true)
    }

  }, [isAuth, firstVisit])

  return (
    <>
      {
        isOpenDownloadModal && <DownloadModal open={isOpenDownloadModal} onClose={handleCloseDownloadModal} width={608} />
      }
      <OneSignalModal open={isOneSignalModalOpen} onClose={handleOneSignalModalClose} />
      <BuildAppLayout currentScreen={Pages.PLUGINS} step={4} progressBarValue={progressBarValue}>
        <PageTitle
          isMobile={isMobile}
          title={t('plugins')}
          subtitle={widgetId ? '' : t('app-icon-description')}
          onBeforeButtonClick={navigateToPrev}
        />
        <MainBlock className='first-step' $isMobile={isMobile}>
          {FeaturesList.map(({ id, text, ...rest }, index, array) => (
            <AccordionItem
              {...rest}
              key={id}
              text={text}
              isFirst={index === 0}
              isLast={index === array.length - 1}
              isActive={!!plugins[text]}
              onPriceButtonClick={
                index === 0 && isAuth
                  ? handleOneSignalModalOpen
                  : handlePriceButtonClick({ id, text, ...rest })
              }
            />
          ))}
          {isMobile && !widgetId && (
            <ProgressWrapper>
              <ProgressBar value={progressBarValue} backgroundColor='background' />
            </ProgressWrapper>
          )}
        </MainBlock>
        <Controls $isMobile={isMobile}>
          <Button className='second-step' loading={isLoading} width={isMobile ? '100%' : 250} onClick={handleOnDownload}>
            {t(widgetId ? 'save' : 'download')}
          </Button>
        </Controls>
      </BuildAppLayout>
    </>
  );
};
