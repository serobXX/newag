import { Radio } from '@mui/material';

import { FormControlLabel, FormControlLabelProps } from '~components/FormControlLabel';

export const RadioButton = (props: Omit<FormControlLabelProps, 'control'>) => {
  return <FormControlLabel control={<Radio />} {...props} />;
};
