import { FormControlLabel, FormControlLabelProps } from '@mui/material';
import styled from 'styled-components';

type TProps = FormControlLabelProps & {
  gap: number;
  $controlSize: number;
};

export const StyledFormControlLabel = styled(FormControlLabel)<TProps>`
  .MuiButtonBase-root {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;

    &.Mui-disabled {
      opacity: ${({ checked }) => (checked ? 0.12 : 0.32)};
    }

    &:hover {
      background-color: ${({ checked }) =>
        checked ? 'rgba(10, 208, 113, 0.12)' : 'rgba(0, 0, 0, 0.08)'};
    }
  }

  .Mui-checked svg {
    color: ${({ theme }) => theme.colors.piccolo};
  }

  .MuiFormControlLabel-label {
    color: ${({ theme }) => theme.colors.bulma};
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    padding-left: ${({ labelPlacement, gap }) => (labelPlacement === 'end' ? `${gap}px` : 0)};
    padding-right: ${({ labelPlacement, gap }) => (labelPlacement === 'start' ? `${gap}px` : 0)};

    &.Mui-disabled {
      color: ${({ theme }) => theme.colors.bulma} !important;
      opacity: 0.32;
    }
  }

  .MuiSvgIcon-fontSizeMedium {
    color: ${({ theme }) => theme.colors.trunks};
    width: ${({ $controlSize }) => $controlSize}px;
    height: ${({ $controlSize }) => $controlSize}px;
  }

  .MuiTouchRipple-root {
    color: ${({ checked }) => (checked ? 'rgba(10, 208, 113, 0.12)' : 'rgba(0, 0, 0, 0.08)')};
  }
`;
