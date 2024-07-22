import { Alert as AlertComponent } from '@mui/material';
import styled from 'styled-components';

export const AlertWrapper = styled(AlertComponent)`
  &.MuiAlert-filledError {
    background-color: ${({ theme }) => theme.colors.supportiveDodoria10};
  }

  .MuiAlert-message {
    .MuiTypography-root {
      font-weight: ${({ theme }) => theme.fontWeights.normal};
      font-family: ${({ theme }) => theme.fontFamily.inter};
      font-size: ${({ theme }) => theme.fontSizes.s};
      margin: 0;
    }
  }

  .MuiAlert-icon {
    display: none;
  }
`;
