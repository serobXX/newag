import styled from 'styled-components';

import { Typography } from '~components/Typography/Typography';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
`;

export const LabelChecked = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.piccolo};
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  border-radius: 4px;
`;

export const ButtonComponent = styled.button`
  width: 56px;
  height: 56px;
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

export const TextWrapper = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 28px;
`;
