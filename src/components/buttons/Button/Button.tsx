import { ButtonHTMLAttributes, forwardRef, MouseEvent, ReactNode } from 'react';

import { ButtonTypes, ButtonVariants } from '~components/buttons/Button/types';
import { CircularProgress } from '~components/CircularProgress/CircularProgress';
import { TypographyVariantTypes } from '~components/Typography/types';
import { Typography } from '~components/Typography/Typography';
import { Colors } from '~types/colors';

import { Container } from './styles';

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: keyof typeof ButtonTypes;
  variant?: keyof typeof ButtonVariants;
  backgroundColor?: Colors;
  color?: Colors;
  textVariant?: TypographyVariantTypes;
  width?: number | 'auto' | '100%';
  disabled?: boolean;
  name?: string;
  rightContent?: ReactNode;
  leftContent?: ReactNode;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Button = forwardRef<HTMLButtonElement, TProps>(
  (
    {
      type = ButtonTypes.button,
      variant = ButtonVariants.primary,
      width = 'auto',
      disabled = false,
      name,
      textVariant = 'm-600',
      onClick,
      leftContent,
      rightContent,
      backgroundColor,
      color,
      children,
      loading,
      ...rest
    },
    ref,
  ) => {
    const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (!disabled && onClick) {
        onClick(event);
      }
    };

    return (
      <Container
        ref={ref}
        type={type as ButtonTypes}
        variant={variant as ButtonVariants}
        style={{ width: typeof width === 'number' ? `${width}px` : width }}
        disabled={disabled || loading}
        name={name}
        onClick={onClickHandler}
        $backgroundColor={backgroundColor}
        {...rest}
      >
        {leftContent}
        {loading ? (
          <CircularProgress size='sm' />
        ) : (
          !!children && (
            <Typography
              color={color || (variant === ButtonVariants.primary ? 'goten' : 'bulma')}
              variant={textVariant}
            >
              {children}
            </Typography>
          )
        )}
        {rightContent}
      </Container>
    );
  },
);

Button.displayName = 'Button';

export default Button;
