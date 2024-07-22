import { StyledSwitch } from './styles';
import { TProps } from './types';

export const TextSwitch = ({ textChecked, textUnchecked, width = 220, ...rest }: TProps) => {
  return (
    <StyledSwitch
      $textChecked={textChecked}
      $textUnchecked={textUnchecked}
      width={width}
      disableRipple
      {...rest}
    />
  );
};
