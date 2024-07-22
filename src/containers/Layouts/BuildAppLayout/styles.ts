import styled from 'styled-components';

import { Typography } from '~components/index';
import { Label } from '~components/Label';

type TMobileProps = { $isMobile: boolean };
type TColorsGridProps = { $isTabletL: boolean };

export const BlockWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 878px;
`;

export const IconWrapper = styled.div`
  padding: ${({ theme }) => theme.spaces.l} ${({ theme }) => theme.spaces.m};
`;

export const AppIconWrapper = styled.div<TMobileProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isMobile }) => ($isMobile ? 'space-between' : 'unset')};
  padding: ${({ $isMobile }) => ($isMobile ? 0 : '12px')} 16px;
`;

export const UploadBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
`;

export const ProgressWrapper = styled.div`
  margin: 0 0 12px 0;
  width: 100%;
`;

export const ContentWrapper = styled.div<TMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? 0 : '16px')};
  padding: ${({ $isMobile }) => ($isMobile ? 0 : '35px 31px 42px 26px')};
`;

export const MainBlock = styled.div<TMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? 0 : '22px')};
`;

export const MainBlockTitle = styled(Typography)`
  padding: 6px 16px;
`;

export const MainBlockSubtitle = styled(Typography)`
  line-height: 20px;
  padding: 8px 16px 13px;
`;

export const ColorsGrid = styled.div<TColorsGridProps & TMobileProps>`
  display: grid;
  grid-template-columns: ${({ $isTabletL }) => ($isTabletL ? 'repeat(4, 1fr)' : 'repeat(8, 1fr)')};
  justify-items: center;
  row-gap: ${({ $isMobile }) => ($isMobile ? 8 : 0)}px;
  padding: ${({ $isMobile }) => ($isMobile ? '0 8px' : '12px 8px 22px')};
`;

export const Controls = styled.div<TMobileProps>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  justify-content: ${({ $isMobile }) => ($isMobile ? 'unset' : 'space-between')};
  gap: ${({ $isMobile }) => ($isMobile ? 20 : 10)}px;
  padding: 10px 16px;
`;

export const ReloadButton = styled(Label)<TMobileProps>`
  margin-right: ${({ $isMobile }) => ($isMobile ? 0 : '22px')};
`;
