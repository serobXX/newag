import styled, { css } from 'styled-components';

import { Colors } from '~types/colors';

import { IconPositions, LabelSize, LabelVariants } from './types';

type TProps = {
  size: LabelSize;
  $variant: LabelVariants;
  disabled: boolean;
  $isClickable: boolean;
  $isLabel: boolean;
  $isIcon: boolean;
  width: number | 'auto' | '100%';
  $iconPosition: IconPositions;
  color?: Colors;
};

const calculatePaddingRight = ({ $isIcon, $isLabel, $iconPosition, size }: TProps) => {
  if (!$isLabel) {
    return size === LabelSize.small ? 4 : 12;
  }

  if (!$isIcon) {
    return size === LabelSize.small ? 12 : 16;
  }

  if ($iconPosition === IconPositions.after) {
    return size === LabelSize.small ? 8 : 12;
  }

  if ($iconPosition === IconPositions.before) {
    return size === LabelSize.small ? 12 : 16;
  }
};

const calculatePaddingLeft = ({ $isIcon, $isLabel, $iconPosition, size }: TProps) => {
  if (!$isLabel) {
    return size === LabelSize.small ? 4 : 12;
  }

  if (!$isIcon) {
    return size === LabelSize.small ? 12 : 16;
  }

  if ($iconPosition === IconPositions.after) {
    return size === LabelSize.small ? 12 : 16;
  }

  if ($iconPosition === IconPositions.before) {
    return size === LabelSize.small ? 8 : 12;
  }
};

const calculateWidth = ({ width, size, $isLabel }: TProps) => {
  if (!$isLabel) {
    return size === LabelSize.small ? '32px' : '48px';
  }

  return typeof width === 'number' ? `${width}px` : width;
};

const LabelTypes = {
  [LabelVariants.primary]: css`
    color: ${({ theme }) => theme.colors.goten};
    background-color: ${({ theme }) => theme.colors.piccolo};
  `,
  [LabelVariants.secondary]: css`
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.bulma};
    background-color: ${({ theme }) => theme.colors.transparent};
  `,
  [LabelVariants.tertiary]: css`
    background-color: ${({ theme }) => theme.colors.goku};
  `,
  [LabelVariants.quaternary]: css`
    background-color: ${({ theme }) => theme.colors.white};
  `,
};

export const Container = styled.div<TProps>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ size }) => (size === LabelSize.small ? 0 : '12px')};
  width: ${(props) => calculateWidth(props)};
  height: ${({ size }) => (size === LabelSize.small ? '32px' : '48px')};
  padding: ${({ size }) => (size === LabelSize.small ? '4px' : '12px')};
  padding-right: ${(props) => `${calculatePaddingRight(props)}px`};
  padding-left: ${(props) => `${calculatePaddingLeft(props)}px`};
  border-radius: 100px;
  user-select: none;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'text')};
  ${({ $variant }) => LabelTypes[$variant]}
  ${({ color }) =>
    color &&
    css`
      background-color: ${({ theme }) => theme.colors[color]};
    `}

  &:hover,
  &:active {
    ${({ disabled, $isClickable, $variant }) =>
    $variant !== LabelVariants.primary &&
      $isClickable &&
      !disabled &&
      css`
        opacity: 0.8;
      `}
    ${({ disabled, $isClickable, $variant }) =>
    $variant === LabelVariants.primary &&
      $isClickable &&
      !disabled &&
      css`
        background-color: ${({ theme }) => theme.colors.piccoloHover};
      `}
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;
