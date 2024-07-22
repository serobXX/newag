import { Switch, SwitchProps } from '@mui/material';
import styled from 'styled-components';

import { SwitchSize } from './types';

interface TProps extends SwitchProps {
  $switchSize: SwitchSize;
  $isThemeSwitch: boolean;
}

type TContainerProps = { $switchSize: SwitchSize };

type TIconWrapperProps = { checked: boolean; $switchSize: SwitchSize };

const Dimensions = {
  [SwitchSize.small]: {
    width: 32,
    height: 16,
    radius: 8,
    thumbSize: 12,
    thumbOffset: 5,
    iconMargin: 3,
    inputOffset: -1,
  },
  [SwitchSize.medium]: {
    width: 44,
    height: 24,
    radius: 15,
    thumbSize: 16,
    thumbOffset: 6,
    iconMargin: 4,
    inputOffset: 2,
  },
  [SwitchSize.large]: {
    width: 60,
    height: 32,
    radius: 22,
    thumbSize: 24,
    thumbOffset: 7,
    iconMargin: 4,
    inputOffset: 1,
  },
};

export const Container = styled.div<TContainerProps>`
  position: relative;
  display: flex;
  height: ${({ $switchSize }) => Dimensions[$switchSize].height}px;
`;

export const StyledSwitch = styled(Switch)<TProps>`
  &.MuiSwitch-root {
    padding: 0;
    width: ${({ $switchSize }) => Dimensions[$switchSize].width}px;
    height: ${({ $switchSize }) => Dimensions[$switchSize].height}px;
  }

  .PrivateSwitchBase-input.MuiSwitch-input {
    width: ${({ $switchSize }) => Dimensions[$switchSize].width}px;
    height: ${({$switchSize }) => Dimensions[$switchSize].height}px;
    left: 0;
  }

  .MuiButtonBase-root.MuiSwitch-switchBase {
    padding: 0;
    height: ${({ $switchSize }) => Dimensions[$switchSize].height}px;
    width: ${({ $switchSize }) => Dimensions[$switchSize].height}px;

    &.Mui-checked {
      transform: translateX(
        ${({ $switchSize }) =>
    Dimensions[$switchSize].width -
          Dimensions[$switchSize].thumbSize -
          Dimensions[$switchSize].thumbOffset}px
      );
    }
  }

  .MuiSwitch-thumb {
    width: ${({ $switchSize }) => Dimensions[$switchSize].thumbSize}px;
    height: ${({ $switchSize }) => Dimensions[$switchSize].thumbSize}px;
    box-shadow: none;
  }

  .MuiSwitch-track {
    height: ${({ $switchSize }) => Dimensions[$switchSize].height}px;
    width: ${({ $switchSize }) => Dimensions[$switchSize].width}px;
    background-color: ${({ theme }) => theme.colors.beerusLight};
    border-radius: ${({ $switchSize }) => Dimensions[$switchSize].radius}px;
    opacity: 1;
  }

  .MuiTouchRipple-root {
    height: ${({ $switchSize }) => Dimensions[$switchSize].height}px;
  }

  .Mui-checked {
    & .PrivateSwitchBase-input.MuiSwitch-input {
      left: unset;
      right: ${({ $switchSize }) => Dimensions[$switchSize].inputOffset}px;
    }

    & .MuiSwitch-thumb {
      margin-left: 0;
      background-color: ${({ theme }) => theme.colors.white};
    }

    & + span.MuiSwitch-track {
      background-color: ${({ theme, $isThemeSwitch }) =>
    $isThemeSwitch ? theme.colors.beerusDark : theme.colors.piccolo};
      opacity: 1;
    }
  }
`;

export const SunWrapper = styled.div<TIconWrapperProps>`
  position: absolute;
  display: ${({ checked }) => (checked ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  pointer-events: none;
  width: ${({ $switchSize }) => Dimensions[$switchSize].thumbSize}px;
  height: ${({ $switchSize }) => Dimensions[$switchSize].height}px;
  margin-right: ${({ $switchSize }) => Dimensions[$switchSize].iconMargin}px;
`;

export const MoonWrapper = styled.div<TIconWrapperProps>`
  position: absolute;
  display: ${({ checked }) => (checked ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  pointer-events: none;
  width: ${({ $switchSize }) => Dimensions[$switchSize].thumbSize}px;
  height: ${({ $switchSize }) => Dimensions[$switchSize].height}px;
  margin-left: ${({ $switchSize }) => Dimensions[$switchSize].iconMargin}px;
`;
