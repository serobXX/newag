import styled from 'styled-components';

import { Typography } from '~components/Typography/Typography';

export const Container = styled.div`
  color: ${({ theme }) => theme.colors.bulma};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TextWrapper = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 16px;
`;

export const ButtonComponent = styled.button`
  background-color: ${({ theme }) => theme.colors.goku};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:not(:disabled):hover,
  &:not(:disabled):active {
    opacity: 0.8;
  }
`;
