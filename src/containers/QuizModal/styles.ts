import styled, { css } from 'styled-components';

import { Typography } from '~components/index';
import { Label } from '~components/Label';

type TProps = { $isMobile?: boolean };

export const FormText = styled(Typography)`
  padding: ${({ theme }) => theme.spaces.m} 0 24px 0;
`;

export const AppIconWrapper = styled.div`
  padding: 0 0 24px 0;
`;

export const ButtonsWrapper = styled.div<TProps>`
  width: 100%;
  display: flex;
  gap: ${({ $isMobile }) => ($isMobile ? '16px' : '0px')};
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  justify-content: center;
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

export const Header = styled(Typography) <TProps>`
  align-self: flex-start;
  font-feature-settings: 'clig' off, 'liga' off;
  color:black;
  font-size: 22px;
  font-weight: 700;
  line-height: ${({ $isMobile }) => ($isMobile ? 56 : 45)}px;
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      padding: 0 8px;
    `};
`;
