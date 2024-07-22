import styled, { css } from 'styled-components';

import { Typography } from '~components/index';
import { Label } from '~components/Label';

type THeaderProps = { $isMobile: boolean };

export const FormText = styled(Typography)`
  padding: ${({ theme }) => theme.spaces.m} 0 24px 0;
`;

export const AppIconWrapper = styled.div`
  padding: 0 0 24px 0;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 0 40px 0;

  &:first-child {
    margin: 0 ${({ theme }) => theme.spaces.m} 0 0;
  }
`;

export const ButtonLabel = styled(Label)`
  position: absolute;
  top: -12px;
  right: 0;
  height: 24px;
  padding: 0 ${({ theme }) => theme.spaces.s};
`;

export const ButtonWrapper = styled.div`
  align-items: center;
  flex-direction: column;
  gap: 16px;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 16px;
  z-index: 9999;
`;

export const Header = styled(Typography)<THeaderProps>`
  align-self: flex-start;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: ${({ $isMobile }) => ($isMobile ? 22 : 32)}px;
  font-weight: 700;
  line-height: ${({ $isMobile }) => ($isMobile ? 56 : 45)}px;
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      padding: 0 8px;
    `};
`;
