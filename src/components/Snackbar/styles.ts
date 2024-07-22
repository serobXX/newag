import { Snackbar } from '@mui/material';
import styled from 'styled-components';

import type { SnackbarPropsExtended } from '.';

export const StyledSnackBar = styled(Snackbar)<
  Omit<SnackbarPropsExtended, 'offsetY | container | horizontalMargin'> & {
    $offsetY?: number;
    width?: number;
    $horizontalMargin?: number;
  }
>`
  .MuiPaper-root {
    box-sizing: border-box;
    width: ${({ width }) => (width ? `${width}px` : 'auto')};
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(2px);
    padding: 12px 16px;
    margin-top: ${({ $offsetY }) => ($offsetY ? `${$offsetY}px` : 'unset')};
    margin-right: ${({ $horizontalMargin }) =>
    $horizontalMargin ? `${$horizontalMargin}px` : 'unset'};
    margin-left: ${({ $horizontalMargin }) =>
    $horizontalMargin ? `${$horizontalMargin}px` : 'unset'};
  }

  .MuiSnackbarContent-message {
    padding: 0;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
`;
