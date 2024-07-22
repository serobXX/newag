import styled from 'styled-components';

import { Typography } from '~components/index';

type TMobileProps = { $isMobile: boolean };

type TIsTabletM = { $isTabletM: boolean };

type TBannersWrapperProps = { $isTabletM: boolean };

export const Container = styled.div<TMobileProps>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: ${({ $isMobile }) => ($isMobile ? 0 : 12)}px;
`;

export const BlockWrapper = styled.div<TMobileProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? 0 : 12)}px;
  width: 100%;
  max-width: 832px;
  padding: ${({ $isMobile }) => ($isMobile ? 0 : '10px')};
`;

export const BannersWrapper = styled.div<TBannersWrapperProps>`
  display: flex;
  flex-direction: ${({ $isTabletM }) => ($isTabletM ? 'column' : 'row')};
  gap: ${({ $isTabletM }) => ($isTabletM ? 0 : 30)}px;
`;

export const BannerWithCountdownWrapper = styled.div<TMobileProps>`
  padding: ${({ $isMobile }) => ($isMobile ? '0 16px' : 0)};
`;

export const TextWrapper = styled.div<TMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? 16 : 22)}px;
`;

export const ControlsWrapper = styled.div<TIsTabletM & TMobileProps>`
  display: flex;
  flex-direction: ${({ $isTabletM }) => ($isTabletM ? 'column' : 'row')};
  justify-content: flex-end;
  gap: 18px;
  padding: ${({ $isMobile }) => ($isMobile ? '10px 0' : '10px 16px')};
`;

export const Title = styled(Typography) <TMobileProps>`
  line-height: ${({ $isMobile }) => ($isMobile ? 24 : 42)}px;
  color: ${({ $isMobile, theme }) => ($isMobile ? 'rgba(0, 0, 0, 0.56)' : theme.colors.black)};
`;

export const Text = styled(Typography)`
  color: ${({ theme }) => theme.colors.middleGrey};
  line-height: 20px;
`;

export const TextAdditionWrapper = styled.div`
  padding-bottom: 13px;
`;

export const PublishTextWrapper = styled.div`
  padding-top: 16px;
`;

export const CircularProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
