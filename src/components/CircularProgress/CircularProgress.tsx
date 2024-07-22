import { CircularProgressProps } from '@mui/joy/CircularProgress';

import { Colors } from '~types/colors';

import { Circular } from './styles';

type TProps = CircularProgressProps & {
  strokeColor?: Colors;
};

export const CircularProgress = ({
  value = 60,
  variant = 'soft',
  strokeColor = 'piccolo',
  thickness = 4,
  ...props
}: TProps) => (
  <Circular
    value={value}
    variant={variant}
    $strokeColor={strokeColor}
    thickness={thickness}
    {...props}
  />
);
