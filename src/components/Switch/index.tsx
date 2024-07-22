import { SwitchProps } from '@mui/material';

import { LargeMoonIcon } from '~assets/icons/switch/LargeMoon';
import { LargeSunIcon } from '~assets/icons/switch/LargeSun';
import { MediumMoonIcon } from '~assets/icons/switch/MediumMoon';
import { MediumSunIcon } from '~assets/icons/switch/MediumSun';
import { SmallMoonIcon } from '~assets/icons/switch/SmallMoon';
import { SmallSunIcon } from '~assets/icons/switch/SmallSun';

import { Container, MoonWrapper, StyledSwitch, SunWrapper } from './styles';
import { SwitchSize } from './types';

interface TProps extends Omit<SwitchProps, 'size'> {
  size?: SwitchSize;
  isThemeSwitch?: boolean;
}

export const Switch = ({
  size = SwitchSize.medium,
  isThemeSwitch = false,
  checked = false,
  ...rest
}: TProps) => {
  return (
    <Container $switchSize={size}>
      <StyledSwitch $switchSize={size} $isThemeSwitch={isThemeSwitch} checked={checked} {...rest} />
      <SunWrapper checked={checked} $switchSize={size}>
        {isThemeSwitch && size === SwitchSize.small && <SmallSunIcon />}
        {isThemeSwitch && size === SwitchSize.medium && <MediumSunIcon />}
        {isThemeSwitch && size === SwitchSize.large && <LargeSunIcon />}
      </SunWrapper>
      <MoonWrapper checked={checked} $switchSize={size}>
        {isThemeSwitch && size === SwitchSize.small && <SmallMoonIcon />}
        {isThemeSwitch && size === SwitchSize.medium && <MediumMoonIcon />}
        {isThemeSwitch && size === SwitchSize.large && <LargeMoonIcon />}
      </MoonWrapper>
    </Container>
  );
};
