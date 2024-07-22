import { Switch } from '@mui/material';
import styled from 'styled-components';

type TProps = {
  $textChecked: string;
  $textUnchecked: string;
};

export const StyledSwitch = styled(Switch)<TProps & { width: number }>`
  &.MuiSwitch-root.MuiSwitch-sizeMedium {
    padding: 0;
    width: ${({ width }) => width}px;
    height: 32px;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .Mui-checked {
    & + span.MuiSwitch-track {
      background-color: ${({ theme }) => theme.colors.lightGrey};
      opacity: 1;
    }

    & .MuiSwitch-thumb {
      background-color: ${({ theme }) => theme.colors.white};
    }

    & .PrivateSwitchBase-input.MuiSwitch-input {
      left: ${({ width }) => `-${width / 2}px`};
    }
  }

  .MuiSwitch-track {
    position: relative;
    height: 32px;
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 22px;
    opacity: 1;

    &:after {
      content: '${({ $textUnchecked }) => $textUnchecked}';
      color: ${({ theme }) => theme.colors.grey};
      position: absolute;
      right: 25%;
      top: 50%;
      transform: translate(50%, -50%);
    }

    &:before {
      content: '${({ $textChecked }) => $textChecked}';
      color: ${({ theme }) => theme.colors.grey};
      position: absolute;
      left: 25%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .MuiButtonBase-root.MuiSwitch-switchBase {
    padding: 0;

    &.Mui-checked {
      transform: translateX(${({ width }) => `${width / 2}px`});

      &:after {
        content: '${({ $textUnchecked }) => $textUnchecked}';
        position: absolute;
        color: ${({ theme }) => theme.colors.black};
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &:not(.Mui-checked) {
      &:after {
        content: '${({ $textChecked }) => $textChecked}';
        position: absolute;
        color: ${({ theme }) => theme.colors.black};
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .PrivateSwitchBase-input.MuiSwitch-input {
    width: ${({ width }) => width}px;
    left: 0;
  }

  .MuiSwitch-thumb {
    width: ${({ width }) => width / 2}px;
    height: 32px;
    box-shadow: none;
    border-radius: 22px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
