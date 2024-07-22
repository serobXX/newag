import styled from 'styled-components';

import { Label } from '~components/Label';

type TMobileProps = { $isMobile: boolean };

export const Container = styled.div<TMobileProps>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: ${({ $isMobile }) => ($isMobile ? 0 : 12)}px;
`;

export const BlockWrapper = styled.div<TMobileProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? 0 : 12)}px;
  width: 100%;
  max-width: 832px;
  padding: ${({ $isMobile }) => ($isMobile ? 0 : '10px')};
`;

export const AppIconWrapper = styled.div<TMobileProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isMobile }) => ($isMobile ? 'space-between' : 'unset')};
  padding: ${({ $isMobile }) => ($isMobile ? 0 : '12px')} 16px;
`;

export const MenuWrapper = styled.div`
  position: relative;
  margin: 16px;
  background-color: ${({ theme }) => theme.colors.goku};
  border-radius: 16px;
  position: relative;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  gap: 12px;
`;

export const StyledLabel = styled(Label)`
  position: absolute;
  top: -16px;
  right: 0;
  height: 24px;
  padding: 0 ${({ theme }) => theme.spaces.s};
`;

export const StyledButtonLabel = styled(StyledLabel)`
  top: -5px;
`;

export const PublishButtonWrapper = styled.div`
  position: relative;
  width: 100%;
`;
