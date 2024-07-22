import styled, { css } from 'styled-components';

import { Link } from '~components/Link';

type TIsMobile = { $isMobile: boolean };

export const Container = styled.div<TIsMobile>`
  display: flex;
  justify-content: ${({ $isMobile }) => ($isMobile ? 'flex-start' : 'center')};
  padding-top: ${({ $isMobile }) => ($isMobile ? 16 : 37)}px;
`;

export const LinksWrapper = styled.div<TIsMobile>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  gap: ${({ $isMobile }) => ($isMobile ? 16 : 30)}px;
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      padding-left: 8px;
    `};
`;

export const StyledLink = styled(Link)<TIsMobile>`
  &.MuiTypography-root {
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: ${({ $isMobile }) => ($isMobile ? 12 : 16)}px;
    font-weight: 400;
    line-height: 16px;
  }
`;
