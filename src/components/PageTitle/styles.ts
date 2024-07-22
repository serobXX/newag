import styled from 'styled-components';

import { Typography } from '..';

type TIsMobile = { $isMobile: boolean };

type TIsBeforeButton = { $isBeforeButton: boolean };

type TPadding = { padding: string };

export const Container = styled.div<TPadding>`
  padding: ${({ padding }) => padding};
`;

export const TitleWrapper = styled.div<TIsMobile>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: ${({ $isMobile }) => ($isMobile ? 48 : 37)}px;
  padding-bottom: 8px;
`;

export const Title = styled(Typography) <TIsMobile & TIsBeforeButton>`
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: ${({ $isMobile }) => ($isMobile ? 22 : 32)}px;
  font-weight: 700;
  line-height: ${({ $isMobile }) => ($isMobile ? 24 : 32)}px;
  margin-left: ${({ $isMobile, $isBeforeButton }) => ($isMobile && $isBeforeButton ? 8 : 0)}px;
`;

export const BeforeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.bulma};
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const SubtitleWrapper = styled.div<TIsMobile>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 8px;
`;

export const Subtitle = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
`;
