import styled from 'styled-components';
import { Typography } from '~components/index';
import { Colors } from '~types/colors';
import { Label } from '~components/Label';

type TIsMobile = { $isMobile: boolean };

type TProps = { $isMobile: boolean; $bgColor?: Colors; $padding?: string, rightContent?: any };




export const TitleWrapper = styled.div<TIsMobile>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: ${({ $isMobile }) => ($isMobile ? 48 : 37)}px;
  padding-bottom: 8px;
`;

export const Title = styled(Typography) <TIsMobile>`
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: ${({ $isMobile }) => ($isMobile ? 18 : 28)}px;
  font-weight: 700;
  line-height: ${({ $isMobile }) => ($isMobile ? 24 : 32)}px;
  color: rgba(0, 0, 0, 0.56);
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




export const Container = styled.div<TProps>`
  box-sizing: border-box;
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? 72 : 88)}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F6F8F9;
  padding: ${({ $isMobile }) => ($isMobile ? '8px 16px' : '16px')};
  border: ${({ $isMobile }) => ($isMobile ? 'none' : '1px solid rgba(0, 0, 0, 0.1)')};
  border-radius: ${({ $isMobile }) => ($isMobile ? 0 : 22)}px;
`;

export const ButtonWrapper = styled.button<TProps>`
  box-sizing: border-box;
  position:relative;
  display: flex;
  align-items: center;
  height: 38px;
  padding: 5px 15px;
  margin-left: 16px;
  border: none;
  border-radius: 8px;
  background-color: #C0FFE9;
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 0.8;
  }
`;
export const DownloadButton = styled.button<TProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 38px;
  padding: 5px 15px;
  margin-left: 16px;
  border: none;
  border-radius: 8px;
  background-color: #FFBC35;
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
