import styled from 'styled-components';

import { Colors } from '~types/colors';

import { Typography } from '..';

type TWidth = { width: number | '100%' };

type TIsMobile = { $isMobile: boolean };

type TInnerProps = { $bgColor: Colors; $bgImage: string };

export const Container = styled.div<TWidth & TIsMobile>`
  box-sizing: border-box;
  padding: ${({ $isMobile }) => ($isMobile ? '16px' : '16px 0')};
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  min-width: 300px;
`;

export const Inner = styled.div<TInnerProps & TWidth>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: 186px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${({ theme, $bgColor }) => theme.colors[$bgColor]};
  background-image: url(${({ $bgImage }) => $bgImage});
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: bottom;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled(Typography)`
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
`;

export const Subtitle = styled(Typography)`
  color: rgba(0, 0, 0, 0.56);
  text-overflow: ellipsis;
  white-space: noemal;
  margin: 0;
`;
