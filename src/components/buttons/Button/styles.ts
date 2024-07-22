import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { ButtonVariants } from '~components/buttons/Button/types';
import { Colors } from '~types/colors';

type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonVariants;
  $backgroundColor?: Colors;
};

const ButtonTypes = {
  [ButtonVariants.primary]: css`
    color: ${({ theme }) => theme.colors.goten};
    background-color: ${({ theme }) => theme.colors.piccolo};

    &:not(:disabled):hover,
    &:not(:disabled):active {
      opacity: 0.9;
    }
  `,
  [ButtonVariants.secondary]: css`
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.bulma};
    background-color: ${({ theme }) => theme.colors.transparent};

    &:not(:disabled):hover,
    &:not(:disabled):active {
      opacity: 0.8;
    }
  `,
  [ButtonVariants.tertiary]: css`
    background-color: ${({ theme }) => theme.colors.goku};

    &:not(:disabled):hover,
    &:not(:disabled):active {
      opacity: 0.8;
    }
  `,
  [ButtonVariants.quaternary]: css`
    background-color: ${({ theme }) => theme.colors.white};

    &:not(:disabled):hover,
    &:not(:disabled):active {
      opacity: 0.8;
    }
  `,
};

export const Container = styled.button<TButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.bulma};
  box-sizing: 'border-box';
  font-feature-settings: 'clig' off, 'liga' off;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: 12px 16px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  position: relative;
  ${({ variant }) => ButtonTypes[variant]}
  ${({ $backgroundColor }) =>
    $backgroundColor &&
    css`
      background-color: ${({ theme }) => theme.colors[$backgroundColor]};
    `}

  &:disabled {
    cursor: not-allowed;
  }
`;
