import { PropsWithChildren } from 'react';
import { useTheme } from 'styled-components';

import { CheckIcon } from '~assets/icons/button/Check';
import { RightArrow } from '~assets/icons/button/RightArrow';

import { TTypographyProps, Typography } from '..';
import { Container } from './styles';

type TProps = PropsWithChildren &
  TTypographyProps & {
    isActive?: boolean;
    isCompleted?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  };

export const MenuItem = ({
  isActive = false,
  isCompleted = false,
  disabled,
  onClick,
  children,
  ...props
}: TProps) => {
  const theme = useTheme();

  return (
    <Container $isactive={isActive} onClick={onClick} disabled={disabled}>
      <Typography color={!disabled ? 'bulma' : 'lightGrey'} {...props}>
        {children}
      </Typography>
      {isCompleted ? (
        <CheckIcon />
      ) : (
        <RightArrow color={!disabled ? theme.colors.black : theme.colors.lightGrey} />
      )}
    </Container>
  );
};
