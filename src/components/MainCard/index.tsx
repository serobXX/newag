import { ReactNode } from 'react';

import { MobileIcon } from '~assets/icons/Mobile';

import { Container, HeaderWrapper, IconWrapper, Link, StyledHeader, StyledHeaderWrapper } from './styles';

type TProps = {
  header: string;
  select?: ReactNode;
  controls?: ReactNode;
  children: ReactNode;
  isMobile?: boolean;
  linkText?: string;
  onLinkClick?: () => void;
};

export const MainCard = ({
  header,
  controls,
  isMobile = false,
  linkText,
  onLinkClick,
  children,
  select
}: TProps) => {
  return (
    <Container $isMobile={isMobile}>
      <HeaderWrapper $isMobile={isMobile}>
        {!isMobile && (
          <IconWrapper>
            <MobileIcon />
          </IconWrapper>
        )}

        <StyledHeaderWrapper $isMobile={isMobile}>
          <StyledHeader Component='h3' $isMobile={isMobile}>
            {header}
          </StyledHeader>
          {select}
        </StyledHeaderWrapper>

        {isMobile && linkText && (
          <Link onClick={onLinkClick} variant='m-600' color='piccolo'>
            {linkText}
          </Link>
        )}
      </HeaderWrapper>
      {children}
      {controls}
    </Container>
  );
};
