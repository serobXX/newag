import styled, { css } from 'styled-components';

import { Typography } from '..';

type TContainerProps = {
  width: number | '100%';
  $isMobile: boolean;
  $columnsCount: number;
  $rowsCount: number;
};

type TIsActive = { $isActive: boolean };

type TIsBorderRight = { $isBorderRight: boolean };

type TIsIconCell = { $isIconCell?: boolean };

export const Container = styled.div<TContainerProps>`
  display: grid;
  grid-template-columns: ${({ $isMobile, $columnsCount }) =>
    $isMobile ? `105px repeat(${$columnsCount}, 1fr)` : `repeat(${$columnsCount}, 1fr)`};
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
`;

export const Header = styled.div<TIsActive & TIsBorderRight>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.supportive : theme.colors.white};
  ${({ $isActive }) =>
    !$isActive &&
    css`
      border: 1px solid rgba(0, 0, 0, 0.08);
    `};
  ${({ $isBorderRight }) =>
    !$isBorderRight &&
    css`
      border-right: none;
    `};
`;

export const OptionText = styled(Typography)`
  letter-spacing: -0.72px;
  line-height: 18px;
`;

export const Cell = styled.div<TIsBorderRight & TIsIconCell>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: ${({ $isIconCell }) => ($isIconCell ? 'center' : 'flex-start')};
  color: ${({ theme }) => theme.colors.piccolo};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-top: none;
  ${({ $isBorderRight }) =>
    !$isBorderRight &&
    css`
      border-right: none;
    `};
`;

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 8px;
`;

export const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
`;
