import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppIcon } from '~components/AppIcon/AppIcon';
import Button from '~components/buttons/Button/Button';
import { MainMenuItem } from '~components/MainMenuItem';
import { PageTitle } from '~components/PageTitle';
import { PATHS } from '~constants/paths';
import { useAuth } from '~hooks/auth';
import { useCreateApp } from '~hooks/create-app';

import { BuyPremiumModal } from '../../BuyPremiumModal';
import { DownloadModal } from '../../DownloadModal/DownloadModal';
import { PreviewModal } from '../../PreviewModal/PreviewModal';
import {
  AppIconWrapper,
  BlockWrapper,
  ButtonsWrapper,
  Container,
  MenuWrapper,
  PublishButtonWrapper,
  StyledButtonLabel,
  StyledLabel,
} from './styles';

export const YourAppsEditMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { appIcon, appName } = useCreateApp();
  const { isPremium } = useAuth();

  const [isPreviewModal, setPreviewModal] = useState(false);
  const [isOpenDownloadModal, setOpenDownloadModal] = useState(false);
  const [isOpenPremiumModal, setOpenPremiumModal] = useState(false);

  const widgetId = location.state?.widgetId as string;

  const navigateToYourApps = () => {
    if (isPremium) {
      navigate(`/${PATHS.YOUR_APPS}`, {
        relative: 'path',
        state: {
          widgetId,
        },
      });
    } else {
      setOpenPremiumModal(true);
    }
  };

  const handleOnGeneral = () => {
    if (isPremium) {
      navigate(`/${PATHS.YOUR_APPS}/${PATHS.EDIT}`, {
        relative: 'path',
        state: {
          widgetId,
        },
      });
    } else {
      setOpenPremiumModal(true);
    }
  };

  const handleOnCustomization = () => {
    if (isPremium) {
      navigate(`/${PATHS.YOUR_APPS}/${PATHS.EDIT}/${PATHS.CUSTOMIZATION}`, {
        relative: 'path',
        state: {
          widgetId,
        },
      });
    } else {
      setOpenPremiumModal(true);
    }
  };

  const handleOnFeature = () => {
    if (isPremium) {
      navigate(`/${PATHS.YOUR_APPS}/${PATHS.EDIT}/${PATHS.FEATURE}`, {
        relative: 'path',
        state: {
          widgetId,
        },
      });
    } else {
      setOpenPremiumModal(true);
    }
  };

  const handleOnPlugins = () => {
    if (isPremium) {
      navigate(`/${PATHS.YOUR_APPS}/${PATHS.EDIT}/${PATHS.PLUGINS}`, {
        relative: 'path',
        state: {
          widgetId,
        },
      });
    } else {
      setOpenPremiumModal(true);
    }
  };

  const handleOnPublish = () => {
    navigate(`/${PATHS.PUBLISH}`, {
      relative: 'path',
      state: {
        from: PATHS.MAIN,
      },
    });
  };

  const handleOnPreview = () => {
    setPreviewModal(true);
  };

  const handleClosePreviewModal = () => {
    setPreviewModal(false);
  };

  const handleOnDownloadApp = () => {
    setOpenDownloadModal(true);
  };

  const handleCloseDownloadModal = () => {
    setOpenDownloadModal(false);
  };

  const handlePremiumModalClose = () => {
    setOpenPremiumModal(false);
  };

  return (
    <>
      <BuyPremiumModal open={isOpenPremiumModal} onClose={handlePremiumModalClose} />
      <DownloadModal open={isOpenDownloadModal} onClose={handleCloseDownloadModal} width={608} />
      <PreviewModal open={isPreviewModal} onClose={handleClosePreviewModal} />
      <Container $isMobile={true}>
        <BlockWrapper $isMobile={true}>
          <PageTitle
            isMobile={true}
            title={t('edit-app')}
            onBeforeButtonClick={navigateToYourApps}
          />
          <AppIconWrapper $isMobile={true}>
            <AppIcon
              icon={appIcon ? <img src={appIcon} width={56} height={56} /> : null}
              text={appName}
            />
          </AppIconWrapper>
          <MenuWrapper>
            {!isPremium && (
              <StyledLabel
                typographyColor='darkLabelText'
                typographyVariant='xxs-400'
                color='banana'
              >
                {t('premium')}
              </StyledLabel>
            )}
            <MainMenuItem text={t('general')} onClick={handleOnGeneral} closeModal={() => {}} />
            <MainMenuItem
              text={t('customization')}
              onClick={handleOnCustomization}
              closeModal={() => {}}
            />
            <MainMenuItem text={t('feature')} onClick={handleOnFeature} closeModal={() => {}} />
            <MainMenuItem text={t('plugins')} onClick={handleOnPlugins} closeModal={() => {}} />
          </MenuWrapper>
          <ButtonsWrapper>
            <Button onClick={handleOnPreview} variant={'secondary'} width={'100%'}>
              {t('preview')}
            </Button>
            <Button onClick={handleOnDownloadApp} variant={'secondary'} width={'100%'}>
              {t('download-app')}
            </Button>
            <PublishButtonWrapper>
              <Button disabled={!isPremium} onClick={handleOnPublish} width={'100%'}>
                {t('publish')}
              </Button>
              {!isPremium && (
                <StyledButtonLabel
                  typographyColor='darkLabelText'
                  typographyVariant='xxs-400'
                  color='banana'
                >
                  {t('premium')}
                </StyledButtonLabel>
              )}
            </PublishButtonWrapper>
          </ButtonsWrapper>
        </BlockWrapper>
      </Container>
    </>
  );
};
