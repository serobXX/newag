import styled from 'styled-components';

type TMobileProps = { $isMobile: boolean };

export const BlockWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 878px;
`;

export const IconWrapper = styled.div`
  padding: ${({ theme }) => theme.spaces.l} ${({ theme }) => theme.spaces.m};
`;

export const ProgressWrapper = styled.div`
  margin: 0 0 12px 0;
  width: 100%;
`;

export const ContentWrapper = styled.div<TMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? 0 : '24px')};
  padding: ${({ $isMobile }) => ($isMobile ? 0 : '32px 31px 42px 26px')};
`;

export const MainBlock = styled.div<TMobileProps>`
  display: flex;
  flex-direction: column;
  margin-top: ${({ $isMobile }) => ($isMobile ? '12px' : 0)};
`;

export const Controls = styled.div<TMobileProps>`
  display: flex;
  padding: 10px 16px;
  align-self: ${({ $isMobile }) => ($isMobile ? 'none' : 'flex-end')};
`;
