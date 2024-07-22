import { Typography } from '~components/Typography/Typography';

import { Container, IconWrapper } from './styles';
import { IconPositions, LabelSize, LabelVariants, TProps } from './types';

export const Label = ({
  size = LabelSize.standard,
  variant = LabelVariants.primary,
  typographyVariant = 'm-600',
  typographyColor,
  icon,
  iconPosition = IconPositions.after,
  disabled = false,
  width = 'auto',
  onClick,
  children,
  ...rest
}: TProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Container
      disabled={disabled}
      $variant={variant}
      onClick={handleClick}
      $isClickable={Boolean(onClick)}
      $isLabel={Boolean(children)}
      $isIcon={Boolean(icon)}
      width={width}
      size={size}
      $iconPosition={iconPosition}
      {...rest}
    >
      {icon && iconPosition === IconPositions.before && <IconWrapper>{icon}</IconWrapper>}
      {children && (
        <Typography
          color={typographyColor || (variant === LabelVariants.primary ? 'goten' : 'bulma')}
          variant={typographyVariant}
        >
          {children}
        </Typography>
      )}
      {icon && iconPosition === IconPositions.after && <IconWrapper>{icon}</IconWrapper>}
    </Container>
  );
};
