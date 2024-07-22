import styled, { css } from 'styled-components';

import { Typography } from '~components/index';
import { Label } from '~components/Label';

type TContainerProps = { $isTabletM: boolean };

type THeaderProps = { $isMobile: boolean };

export const Container = styled.div<TContainerProps>`
  display: flex;
  flex-direction: ${({ $isTabletM }) => ($isTabletM ? 'column' : 'row')};
  justify-content: ${({ $isTabletM }) => ($isTabletM ? 'center' : 'space-between')};
  align-items: center;
  padding-bottom: ${({ $isTabletM }) => ($isTabletM ? 16 : 30)}px;
  gap: ${({ $isTabletM }) => ($isTabletM ? 16 : 0)}px;
`;

export const SwitchWrapper = styled.div`
  position: relative;
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

export const StyledLabel = styled(Label)`
  position: absolute;
  top: -9px;
  right: -4px;
  padding: 4px;
  border-radius: 8px;
  height: 18px;
  z-index: 999;
`;
