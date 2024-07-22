import { forwardRef, InputHTMLAttributes } from 'react';

import { Colors } from '~types/colors';

import { InputComponent } from './styles';

export type TProps = InputHTMLAttributes<HTMLInputElement> & {
  color?: Colors;
};

export const Input = forwardRef<HTMLInputElement, TProps>((props, ref) => (
  <InputComponent ref={ref} {...props} />
));

Input.displayName = 'input';
