import styled, { css } from 'styled-components';

import { Colors } from '~types/colors';

import { Typography } from '..';

type TBgColor = { $bgColor?: Colors };

type TColor = { $color?: Colors };

export const Wrapper = styled.div<TBgColor>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px 8px 28px;
  cursor: pointer;
  ${({ theme, $bgColor }) =>
    $bgColor &&
    css`
      background-color: ${theme.colors[$bgColor]};
    `}

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledTypography = styled(Typography)<TColor>`
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.48px;

  ${({ theme, $color }) =>
    $color &&
    css`
      color: ${theme.colors[$color]};
    `}
`;

export const StyledIconButton = styled.div`
  width: 32px;
  height: 32px;
`;
