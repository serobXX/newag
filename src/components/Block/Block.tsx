import { PropsWithChildren, ReactNode } from 'react';

import { Container, LeftChildContainer, MainContainer, RightChildContainer } from './styles';

type TProps = PropsWithChildren & {
  rightContent?: ReactNode;
  leftContent?: ReactNode;
  isRoundCorners?: boolean;
};

export const Block = ({ leftContent, rightContent, isRoundCorners = true, children }: TProps) => (
  <Container $isRoundCorners={isRoundCorners}>
    {!!leftContent && <LeftChildContainer>{leftContent}</LeftChildContainer>}
    <MainContainer>{children}</MainContainer>
    {!!rightContent && <RightChildContainer>{rightContent}</RightChildContainer>}
  </Container>
);
