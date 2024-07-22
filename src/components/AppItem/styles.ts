import styled from 'styled-components';

import { Colors } from '~types/colors';
import { Label } from '~components/Label';
import { Typography } from '..';

type TProps = { $isMobile: boolean; $bgColor?: Colors; $padding?: string, rightContent?: any };
type DownloadButtonProps = {
  onClick: () => Promise<void>;
}

export const Container = styled.div<TProps>`
  box-sizing: border-box;
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? 72 : 88)}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme, $isMobile, $bgColor }) =>
    $bgColor || $isMobile ? theme.colors.lightBackground : theme.colors.featureBackground};
  padding: ${({ $isMobile }) => ($isMobile ? '8px 16px' : '16px')};
  border: ${({ $isMobile }) => ($isMobile ? 'none' : '1px solid rgba(0, 0, 0, 0.1)')};
  border-radius: ${({ $isMobile }) => ($isMobile ? 0 : 22)}px;
`;

export const EditButton = styled.button<TProps>`
  box-sizing: border-box;
  position:relative;
  display: flex;
  align-items: center;
  height: 38px;
  padding: 5px 15px;
  margin-left: 16px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme, $isMobile }) => theme.colors.metalsSilver};
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 0.8;
  }
`;
export const DownloadButton = styled.button<TProps & DownloadButtonProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 38px;
  padding: 5px 15px;
  margin-left: 16px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme, $isMobile }) => theme.colors.metalsSilver};
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 0.8;
  }
`;
export const ButtonLabel = styled(Label)`
position: absolute;
  top: -12px;
  height: 12px;
  padding: 0 ${({ theme }) => theme.spaces.s};
`;

export const ButtonText = styled(Typography)`
  line-height: 29px;
`;
