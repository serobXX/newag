import styled from 'styled-components';

type TContainerProps = { $isRoundCorners: boolean };

export const Container = styled.div<TContainerProps>`
  background: ${({ theme }) => theme.colors.lightBackground};
  border-radius: ${({ $isRoundCorners }) => ($isRoundCorners ? 22 : 0)}px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`;

export const LeftChildContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-bottom-left-radius: inherit;
  border-top-left-radius: inherit;
  width: 45%;
  height: inherit;
  max-width: 31%;
`;

export const RightChildContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-bottom-right-radius: inherit;
  border-top-right-radius: inherit;
  width: 45%;
  height: inherit;
  max-width: 31%;
`;

export const MainContainer = styled.div`
  width: 100%;
  height: inherit;
`;
