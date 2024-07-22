import styled, { css } from 'styled-components';

import { Alert } from '~components/Alert';
import { Typography } from '~components/index';

type TMobileProps = { $isMobile: boolean };

type TPadding = { padding?: string };

export const Header = styled(Typography)<TMobileProps>`
  line-height: ${({ $isMobile }) => ($isMobile ? 56 : 45)}px;
`;

export const FormText = styled(Typography)<TMobileProps>`
  padding: ${({ $isMobile, theme }) => ($isMobile ? '8px 0 15px' : `${theme.spaces.m} 0 24px 0`)};
  line-height: 20px;
`;

export const Description = styled(Typography)`
  padding: ${({ theme }) => theme.spaces.m} 0 24px 0;
`;

export const InputFieldWrapper = styled.div<TMobileProps>`
  margin: ${({ $isMobile }) => ($isMobile ? '0' : '0 0 10px 0')};
`;

export const AlertWrapper = styled(Alert)<TMobileProps>`
  margin: ${({ $isMobile, theme }) => ($isMobile ? '0 0 10px 0' : `0 0 ${theme.spaces.m} 0`)};
`;

export const SaveButtonWrapper = styled.div<TMobileProps & TPadding>`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  justify-content: ${({ $isMobile }) => ($isMobile ? 'center' : 'flex-end')};
  margin: ${({ $isMobile, theme }) =>
    $isMobile ? '0 0 16px' : `${theme.spaces.l} 0 ${theme.spaces.s} 0`};
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
`;
