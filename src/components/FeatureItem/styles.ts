import styled from 'styled-components';

import { Typography } from '..';

type TContainerProps = { $isFirst: boolean; $isLast: boolean };

export const Container = styled.div<TContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.featureBackground};
  padding: 12px 16px;
  border-top-right-radius: ${({ $isFirst }) => ($isFirst ? '8px' : 0)};
  border-top-left-radius: ${({ $isFirst }) => ($isFirst ? '8px' : 0)};
  border-bottom-left-radius: ${({ $isLast }) => ($isLast ? '8px' : 0)};
  border-bottom-right-radius: ${({ $isLast }) => ($isLast ? '8px' : 0)};
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  padding: 4px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 5px 10px 5px 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

export const EditButton = styled(AddButton)`
  justify-content: unset;
`;

export const ButtonText = styled(Typography)`
  line-height: 29px;
`;
