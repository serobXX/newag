import styled from 'styled-components';

import { TextSwitch } from '~components/TextSwitch';
import { Colors } from '~types/colors';

type TProps = {
  $backgroundColor?: Colors;
  $mobileSize?: number | string;
  $phoneWrapperSizeW?: string;
  $phoneWrapperSizeH?: string;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Switcher = styled(TextSwitch)`
  margin: 0 0 ${({ theme }) => theme.spaces.m} 0;
`;

export const Phone = styled.img<TProps>`
  object-fit: contain;
  width: ${({ $mobileSize }) => $mobileSize || '260px'};
  position: absolute;
`;

export const PhoneWrapper = styled.div<TProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ $phoneWrapperSizeH }) => $phoneWrapperSizeH || '510px'};
  width: ${({ $phoneWrapperSizeW }) => $phoneWrapperSizeW || '240px'};
  background: ${({ $backgroundColor = 'black', theme }) => theme.colors[$backgroundColor]};
  border-radius: 40px;

  iframe {
    height: 86%;
    width: 93%;
    border: none;
    z-index: 1;
  }
`;

export const PreviewButtonWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
`;

export const PreviewIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 ${({ theme }) => theme.spaces.s};
`;
