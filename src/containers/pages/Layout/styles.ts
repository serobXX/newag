import styled from 'styled-components';

type TMobileProps = { $isMobile: boolean };

export const Wrapper = styled.div<TMobileProps>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin: ${({ theme, $isMobile }) => ($isMobile ? 0 : theme.spaces.m)} 0
    ${({ theme }) => theme.spaces.l} 0;
`;

export const PreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 310px;
  margin: 42px 0 0 0;
`;

export const CircularProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;
