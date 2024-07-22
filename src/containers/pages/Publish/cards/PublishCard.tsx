import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Button from '~components/buttons/Button/Button';
import { MainCard } from '~components/MainCard';
import { useAuth } from '~hooks/auth';

import { ControlsWrapper, PublishTextWrapper, Text } from '../styles';
import AppSelect from '~components/Select';
import { useDashboard } from '~hooks/dashboard';
import { loadStripe } from '@stripe/stripe-js';
import { getBuildEnvVar } from '~utils/env';
import { useState } from 'react';
import { BuyPremiumModal } from '../../../../containers/BuyPremiumModal';
import { usePublishApp } from '~hooks/api/dashboard';


export const PublishCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const isTabletM = useMediaQuery(theme.breakpoints['--tablet-m']);
  const { isPremium } = useAuth();
  const { t } = useTranslation();
  const { appList, selectedApp } = useDashboard()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const publishQuery = usePublishApp()


  const onPublish = async () => {
    try {
      const response = await publishQuery.mutateAsync(selectedApp);
      if (response.paymentlink) {
        window.open(response.paymentlink, '_blank');
      } else {
        alert('Payment link not found in response');
      }
    } catch (error) {
      alert(`Error during publish: ${error}`);
    }

  };
  const onUpgradeToPremium = () => {
    setIsModalOpen(true);
  }
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <BuyPremiumModal open={isModalOpen} onClose={handleModalClose} />
      <MainCard
        header={t('we-publish-your-app')}
        select={
          <AppSelect select={appList} />
        }
        controls={
          <ControlsWrapper $isTabletM={!isTabletM} $isMobile={isMobile}>
            <Button
              disabled={!selectedApp}
              onClick={!isPremium ? onUpgradeToPremium : onPublish}
              width={!isTabletM ? '100%' : 250}
            >
              {!isPremium ? t('upgrade-to-premium') : t('publish')}
            </Button>
          </ControlsWrapper>
        }
        isMobile={isMobile}
      >
        {isMobile ? (
          <PublishTextWrapper>
            <Text variant='m-400'>   The ASO professional will submit your app to Google Play for approval and distribution.
              Our specialist will discuss details with you and publish your ASO-optimized app.<br />
              • You do not spend your energy and nerves on publishing for 14 days, as Google
              constantly makes changes to its company policy and adds complications for
              publishers<br />
              • You trust the work of professionals with 10 years of experience<br />
              • ASO specialist will write a tasty and optimized ASO description for your<br />
              application<br />
              • ASO professional can provide a uniquely designed logo, app icons, and beautifully<br />
              curated screenshots of your application<br />
              • App will be published on your or our Google Play Developer account<br />
              • If you have an active Premium plan, buying this publishing offer will mean<br /></Text>
          </PublishTextWrapper>
        ) : (
          <Text variant='m-400'>
            The ASO professional will submit your app to Google Play for approval and distribution.
            Our specialist will discuss details with you and publish your ASO-optimized app.<br />
            • You do not spend your energy and nerves on publishing for 14 days, as Google
            constantly makes changes to its company policy and adds complications for
            publishers<br />
            • You trust the work of professionals with 10 years of experience<br />
            • ASO specialist will write a tasty and optimized ASO description for your<br />
            application<br />
            • ASO professional can provide a uniquely designed logo, app icons, and beautifully<br />
            curated screenshots of your application<br />
            • App will be published on your or our Google Play Developer account<br />
            • If you have an active Premium plan, buying this publishing offer will mean<br />
          </Text>
        )}
      </MainCard>
    </>
  );
};
