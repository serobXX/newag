import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { Container, LinksWrapper, StyledLink } from './styles';

export const BuyPremiumFooter = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);

  return (
    <Container $isMobile={isMobile}>
      <LinksWrapper $isMobile={isMobile}>
        <StyledLink
          target='_blank'
          href='https://appsgeyser.com/support/take-advantage-of-premium-features/premium-troubleshooting-purchases/'
          $isMobile={isMobile}
        >
          {t('trouble-purchase')}
        </StyledLink>
        <StyledLink
          target='_blank'
          href='https://appsgeyser.com/support/take-advantage-of-premium-features/premium-faq/'
          $isMobile={isMobile}
        >
          {t('premium-faq')}
        </StyledLink>
      </LinksWrapper>
    </Container>
  );
};
