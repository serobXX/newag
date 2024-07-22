import { Checkbox as MUICheckbox } from '@mui/material';

import { FormControlLabel, FormControlLabelProps } from '~components/FormControlLabel';

export const Checkbox = (props: Omit<FormControlLabelProps, 'control'>) => {
  return <FormControlLabel control={<MUICheckbox />} controlSize={16} {...props} />;
};
