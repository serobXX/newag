import { AlertProps, AlertTitle } from '@mui/material';

import { AlertWrapper } from './styles';

type TProps = AlertProps & {
  text?: string;
};

export const Alert = ({ text, color = 'error', variant = 'filled', ...props }: TProps) => (
  <AlertWrapper variant={variant} color={color} {...props}>
    <AlertTitle>{text}</AlertTitle>
  </AlertWrapper>
);
