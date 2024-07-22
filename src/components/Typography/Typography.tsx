import { PropsWithChildren } from 'react';

import { Colors } from '~types/colors';

import { Container } from './styles';
import { TypographyVariantTypes } from './types';

export type TTypographyProps = PropsWithChildren & {
  variant?: TypographyVariantTypes;
  color?: Colors;
  Component?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  onClick?: () => void;
};

export const Typography = ({
  variant = 'm-600',
  color = 'bulma',
  Component = 'p',
  children,
  onClick,
  ...props
}: TTypographyProps) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Container as={Component} variant={variant} color={color} {...props} onClick={handleOnClick}>
      {children}
    </Container>
  );
};
