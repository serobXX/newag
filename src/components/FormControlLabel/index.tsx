import { FormControlLabelProps as MUIFormControlLabelProps } from '@mui/material';

import { StyledFormControlLabel } from './styles';
import { LabelPlacements } from './types';

export interface FormControlLabelProps extends MUIFormControlLabelProps {
  labelPlacement?: LabelPlacements;
  gap?: number;
  controlSize?: number;
}

export const FormControlLabel = ({
  labelPlacement = LabelPlacements.end,
  gap = 4,
  controlSize = 15,
  ...rest
}: FormControlLabelProps) => (
  <StyledFormControlLabel
    labelPlacement={labelPlacement}
    gap={gap}
    $controlSize={controlSize}
    {...rest}
  />
);
