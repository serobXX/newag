import styled from 'styled-components';

import { Colors } from '~types/colors';

type TProps = {
  color?: Colors;
};

export const InputComponent = styled.input<TProps>`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, color = 'beerus' }) => theme.colors[color]};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gohan};
  color: ${({ theme }) => theme.colors.text};
  height: 48px;
  width: -webkit-fill-available;
  outline: none;
  padding: 0 ${({ theme }) => theme.spaces.m};
`;
