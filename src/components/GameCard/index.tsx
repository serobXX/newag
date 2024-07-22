import { ReactNode } from 'react';

import { MobileIcon } from '~assets/icons/Mobile';

import { Container, HeaderWrapper, IconWrapper, Link, StyledHeader } from './styles';

type TProps = {
  header: string;
  controls?: ReactNode;
  children: ReactNode;
  isMobile?: boolean;
  linkText?: string;
  onLinkClick?: () => void;
};

export const GameCard = ({
  header,
  controls,
  isMobile = false,
  linkText,
  onLinkClick,
  children,
}: TProps) => {
  return (
    <Container $isMobile={isMobile}>
      <HeaderWrapper $isMobile={isMobile}>
        <StyledHeader Component='h3' $isMobile={isMobile}>
          {header}
        </StyledHeader>
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
