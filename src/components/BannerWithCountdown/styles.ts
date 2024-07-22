import styled from 'styled-components';

import RedClockDesktop from '~assets/img/banners/red-clock-desktop.png';

import { Typography } from '..';

type TIsMobile = { $isMobile: boolean };

export const Container = styled.div<TIsMobile>`
  display: flex;
  justify-content: ${({ $isMobile }) => ($isMobile ? 'center' : 'space-between')};
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? 4 : 16)}px;
  background-color: ${({ theme, $isMobile }) =>
    $isMobile ? theme.colors.supportiveChiChi60 : theme.colors.red};
  padding: ${({ $isMobile }) => ($isMobile ? '12px 22px' : '16px')};
  border-radius: 16px;
  background-image: ${({ $isMobile }) => ($isMobile ? 'none' : `url(${RedClockDesktop})`)};
  background-repeat: no-repeat;
  background-position-x: 80%;
  background-position-y: bottom;
`;

export const TextWrapper = styled.div<TIsMobile>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: center;
  gap: 4px;
`;

export const Text = styled(Typography)<TIsMobile>`
  font-size: ${({ $isMobile }) => ($isMobile ? 15 : 24)}px;
  font-weight: ${({ $isMobile }) => ($isMobile ? 500 : 700)};
  line-height: ${({ $isMobile }) => ($isMobile ? 18 : 32)}px;
`;

export const OffText = styled(Typography)`
  font-weight: 800;
`;

export const ClockWrapper = styled.div<TIsMobile>`
  display: flex;
  width: ${({ $isMobile }) => ($isMobile ? 170 : 130)}px;
`;

export const Clock = styled(Typography)<TIsMobile>`
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: ${({ $isMobile }) => ($isMobile ? 36 : 28)}px;
  font-weight: ${({ $isMobile }) => ($isMobile ? 800 : 700)};
  line-height: ${({ $isMobile }) => ($isMobile ? 46 : 39.5)}px;
`;
