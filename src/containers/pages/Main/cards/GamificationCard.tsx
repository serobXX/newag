import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { PublishTextWrapper, Text } from '../styles';
import { GameCard } from '~components/GameCard';
import { ReactNode } from 'react';


type TProps = {
  children?: ReactNode
};

export const GamificationCard = ({
  children
}: TProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const { t } = useTranslation();

  return (
    <GameCard
      header={''}
    >
      {isMobile ? (
        <PublishTextWrapper>
          <Text variant='m-400'>{t('no-publish-text')}</Text>
        </PublishTextWrapper>
      ) : (
        <Text variant='m-400'>{t('no-publish-text')}</Text>
      )}
      {children}
    </GameCard>
  );
};
