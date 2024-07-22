import { SwitchProps } from '@mui/material';

export type TProps = SwitchProps & {
  textChecked: string;
  textUnchecked: string;
  width?: number;
};
