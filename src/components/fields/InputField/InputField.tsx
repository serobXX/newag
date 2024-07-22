import { forwardRef, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Input, TProps as TInputProps } from '~components/Input/Input';

import { Label, Text, Wrapper } from './styled';

type TProps = InputHTMLAttributes<HTMLInputElement> &
  UseFormRegisterReturn &
  TInputProps & {
    label?: string;
    text?: string;
    message?: string;
    type?: string;
    padding?: string;
  };

export const InputField = forwardRef<HTMLInputElement, TProps>(
  ({ label, text, message, type, padding, disabled, ...props }, ref) => (
    <Wrapper style={{ padding: padding }}>
      {!!label && <Label variant='m-500'>{label}</Label>}
      <Input
        color={message ? 'supportiveDodoria10' : 'beerus'}
        style={{ borderWidth: message ? 2 : 1, opacity: disabled ? 0.5 : 1 }}
        disabled={disabled}
        {...props}
        ref={ref}
      />
      {((!!message && type === 'pattern') || !!text) && (
        <Text
          variant='s-400'
          color={!!message && type === 'pattern' ? 'supportiveDodoria10' : 'trunks'}
        >
          {type === 'pattern' ? message : text}
        </Text>
      )}
    </Wrapper>
  ),
);

InputField.displayName = 'InputField';
