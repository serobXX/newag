import styled from 'styled-components';

import { Typography } from '..';

type TIsMobile = { $isMobile: boolean };

export const Container = styled.div<TIsMobile>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? 0 : 22)}px;
  background-color: ${({ $isMobile, theme }) => ($isMobile ? 'transparent' : theme.colors.white)};
  padding: ${({ $isMobile }) => ($isMobile ? '16px 16px 0' : '32px')};
  border-radius: 22px;
  border: ${({ $isMobile }) => ($isMobile ? 'none' : '1px solid rgba(0, 0, 0, 0.1)')};
`;

export const HeaderWrapper = styled.div<TIsMobile>`
  display: flex;
  gap: 12px;
  justify-content: ${({ $isMobile }) => ($isMobile ? 'space-between' : 'flex-start')};
  align-items: center;
`;

export const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.unaGreenLight};
`;

export const StyledHeader = styled(Typography)<TIsMobile>`
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: ${({ $isMobile }) => ($isMobile ? 18 : 22)}px;
  font-weight: 700;
  line-height: 28px;
`;

export const Link = styled(Typography)`
  cursor: pointer;
`;
