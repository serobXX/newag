import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  :root {
    --bodyColor: ${({ theme }) => theme.colors.background};
  }

  body {
    font-family: ${({ theme }) => theme.fontFamily.inter};
    background: var(--bodyColor);
  }
`;
