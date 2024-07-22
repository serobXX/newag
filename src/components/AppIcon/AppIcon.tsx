import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { BigStarIcon } from '~assets/icons/BigStar';

import { Typography } from '..';
import { Container, IconWrapper } from './styles';
import { Badge, Chip } from '@mui/material';

type TProps = {
  text?: string;
  icon?: ReactNode;
  maxLength?: number;
  badge?: string
  color?: string
};

export const AppIcon = ({ text, icon, maxLength, badge, color }: TProps) => {
  const { t } = useTranslation();
  const truncateText = (str: string, maxLength: number) => {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  };
  const truncatedText = maxLength ? truncateText(text || t('new-app'), maxLength) : text || t('new-app');
  return (
    <Container>
      <IconWrapper>{icon ? icon : <BigStarIcon color={color} />}</IconWrapper>
      <Typography variant='m-500'>{truncatedText}
        &nbsp;
        {
          badge && <Chip label={badge} style={{ backgroundColor: color }} />
        }
      </Typography>
    </Container>
  );
};
