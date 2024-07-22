import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Button from '~components/buttons/Button/Button';
import { MainCard } from '~components/MainCard';
import { useAuth } from '~hooks/auth';

import { BuyPremiumModal } from '../../../BuyPremiumModal';
import { ControlsWrapper, Text, TextAdditionWrapper, TextWrapper, Title } from '../styles';
import { useTour } from '@reactour/tour';

export const PremiumCard = () => {
  const theme = useTheme();
  const { premium, isPremium, isAuth, firstVisit } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const isTabletM = useMediaQuery(theme.breakpoints['--tablet-m']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const { setIsOpen, setCurrentStep } = useTour()

  const noPremiumTitle = isMobile ? t('no-plan') : t('no-premium');
  const noPremiumText = t('no-premium-text');

  const handleModalOpen = () => {
    setIsOpen(false)
    setIsModalOpen(true);
  }; if (isAuth && firstVisit) {
    setIsOpen(true)

  }

  const handleModalClose = () => {

    setCurrentStep(3)
    setIsModalOpen(false);
  };

  return (
    <>
      <BuyPremiumModal open={isModalOpen} onClose={handleModalClose} />
      <MainCard
        header='Premium'
        controls={
          <ControlsWrapper $isTabletM={!isTabletM} $isMobile={isMobile}>
            {!isMobile && (
              <>
                {isPremium && (
                  <Button
                    width={!isTabletM ? '100%' : 250}
                    variant='secondary'
                    onClick={handleModalOpen}
                  >
                    {t('more-premium')}
                  </Button>
                )}
                {!isPremium && (
                  <Button width={!isTabletM ? '100%' : 250} onClick={handleModalOpen}>
                    {t('upgrade-to-premium')}
                  </Button>
                )}
              </>
            )}
            {isMobile && !isPremium && (
              <Button width='100%' onClick={handleModalOpen}>
                {t('upgrade-account')}
              </Button>
            )}
          </ControlsWrapper>
        }
        isMobile={isMobile}
        linkText={t('more')}
        onLinkClick={handleModalOpen}
      >
        <TextWrapper $isMobile={isMobile}>
          <Title variant={isMobile ? 'm-400' : 'm-700'} $isMobile={isMobile}>
            {isPremium ? `${t('active-plan')}: ${premium?.plan}` : noPremiumTitle}
          </Title>
          <TextAdditionWrapper>
            <Text variant='m-400'>{isPremium ? premium?.description : noPremiumText}</Text>
          </TextAdditionWrapper>
        </TextWrapper>
      </MainCard>
    </>
  );
};
