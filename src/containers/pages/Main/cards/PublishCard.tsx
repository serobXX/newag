import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Button from '~components/buttons/Button/Button';
import { MainCard } from '~components/MainCard';
import { useAuth } from '~hooks/auth';

import { ControlsWrapper, PublishTextWrapper, Text } from '../styles';

type TProps = {
  onPublish: () => void;
  onUpgradeToPremium: () => void;
  onCreateApp: () => void;
  onHowToPublish: () => void;
};

export const PublishCard = ({
  onPublish,
  onUpgradeToPremium,
  onCreateApp,
  onHowToPublish,
}: TProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const isTabletM = useMediaQuery(theme.breakpoints['--tablet-m']);
  const { isPremium } = useAuth();
  const { t } = useTranslation();

  return (
    <MainCard
      header={t('publish-app')}
      controls={
        <ControlsWrapper $isTabletM={!isTabletM} $isMobile={isMobile}>
          <Button
            onClick={isMobile ? onPublish : onHowToPublish}
            width={!isTabletM ? '100%' : 250}
            variant='secondary'
          >
            {isMobile ? t('publish') : t('how-to-publish')}
          </Button>
          <Button
            onClick={isMobile && !isPremium ? onUpgradeToPremium : onCreateApp}
            width={!isTabletM ? '100%' : 250}
          >
            {isMobile && !isPremium ? t('upgrade-to-premium') : t('create-app')}
          </Button>
        </ControlsWrapper>
      }
      isMobile={isMobile}
    >
      {isMobile ? (
        <PublishTextWrapper>
          <Text variant='m-400'>{t('no-publish-text')}</Text>
        </PublishTextWrapper>
      ) : (
        <Text variant='m-400'>{t('no-publish-text')}</Text>
      )}
    </MainCard>
  );
};
