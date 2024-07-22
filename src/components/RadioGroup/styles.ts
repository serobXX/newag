import { FormControl, FormLabel, RadioGroup } from '@mui/material';
import styled from 'styled-components';

export const StyledFormControl = styled(FormControl)`
  &.MuiFormControl-root {
    padding: 12px 16px;
  }
`;

export const StyledFormLabel = styled(FormLabel)`
  &.MuiFormLabel-root {
    color: ${({ theme }) => theme.colors.bulma};
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
  }
  &.MuiFormLabel-root.Mui-focused {
    color: ${({ theme }) => theme.colors.bulma};
  }
`;

export const StyledRadioGroup = styled(RadioGroup)`
  & .MuiFormControlLabel-root {
    margin: 0;
    margin-top: 10px;
  }
`;
