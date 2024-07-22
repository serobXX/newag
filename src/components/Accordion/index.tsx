import { AccordionDetails, AccordionSummary, Link, useMediaQuery } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { DownArrowIcon } from '~assets/icons/button/DownArrow';
import { UpArrowIcon } from '~assets/icons/button/UpArrow';
import { TypographyVariantTypes } from '~components/Typography/types';

import { Typography } from '..';
import {
  AccordionRightWrapper,
  AccordionWrapper,
  Cheap,
  CheapPrice,
  Container,
  ContentWrapper,
  IconWrapper,
  MainTextWrapper,
  Wrapper,
} from './styles';
import { FeatureItemState } from './types';
import { enableBodyScroll } from 'body-scroll-lock';

type TProps = {
  icon: ReactNode;
  text: string;
  isFirst?: boolean;
  isLast?: boolean;
  isActive?: boolean;
  value?: string;
  state?: FeatureItemState;
  description?: string;
  price?: string;
  expanded?: boolean;
  pervalue?: string;
  onPriceButtonClick?: () => void;
};

export const AccordionItem = ({
  icon,
  text,
  value,
  description,
  pervalue,
  price,
  isFirst = false,
  isLast = false,
  isActive = false,
  expanded,
  onPriceButtonClick,
}: TProps) => {
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);

  const handleCollapse = () => {
    enableBodyScroll(document.body);
    setCollapse((prev) => !prev);
  };

  return (
    <AccordionWrapper expanded={expanded} onChange={handleCollapse}>
      <AccordionSummary>
        <Container $isMobile={isMobile} $isFirst={isFirst} $isLast={isLast}>
          <Wrapper>
            <IconWrapper>{icon}</IconWrapper>
            <ContentWrapper>
              <Typography variant='m-600'>{text}</Typography>
              {value && (
                <MainTextWrapper>
                  <Typography variant={isMobile ? 's-400' : 'm-400'} color='lightBackdrop'>
                    {value}
                  </Typography>
                  <PriceCheap
                    cheepVariant={'s-400'}
                    backgroundColor={theme.colors.banana}
                    backgroundHoverColor={theme.colors.banana}
                    cheapPadding={'4px 4px'}
                    isActive={false}
                    value={pervalue}
                    opacity={0.56}
                  />
                </MainTextWrapper>
              )}
            </ContentWrapper>
          </Wrapper>
          <AccordionRightWrapper>
            {price && (
              <PriceCheap
                value={price}
                backgroundColor={isActive ? theme.colors.piccolo : theme.colors.background}
                cheapPadding={'4px 14px'}
                isActive={isActive}
                onClick={onPriceButtonClick}
              />
            )}
            {!isMobile && expanded ? collapse ? <UpArrowIcon /> : <DownArrowIcon /> : null}
          </AccordionRightWrapper>
        </Container>
      </AccordionSummary>
      <AccordionDetails>
        <Typography color='middleGrey' variant='s-400'>
          {description}
        </Typography>
        <Link color={theme.colors.supportive10} variant='subtitle2' href='#'>
          {t('read-doc')}
        </Link>
      </AccordionDetails>
    </AccordionWrapper>
  );
};

const PriceCheap = ({
  value = '$100',
  backgroundColor,
  backgroundHoverColor,
  cheapPadding,
  cheepVariant = 'm-600',
  opacity = 1,
  isActive = false,
  onClick,
}: {
  value?: string | number;
  backgroundColor: string;
  backgroundHoverColor?: string;
  cheapPadding: string;
  cheepVariant?: TypographyVariantTypes;
  opacity?: number;
  isActive?: boolean;
  onClick?: () => void;
}) => (
  <Cheap
    $backgroundColor={backgroundColor}
    $backgroundHoverColor={backgroundHoverColor}
    $isActive={isActive}
    onClick={onClick}
  >
    <CheapPrice color='bulma' $opacity={opacity} $padding={cheapPadding} variant={cheepVariant}>
      {value}
    </CheapPrice>
  </Cheap>
);
