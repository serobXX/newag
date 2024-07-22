import { TypographyVariantTypes } from '~components/Typography/types';
import { Colors } from '~types/colors';

export type TProps = {
  size?: LabelSize;
  variant?: LabelVariants;
  typographyVariant?: TypographyVariantTypes;
  typographyColor?: Colors;
  color?: Colors;
  icon?: React.ReactNode;
  iconPosition?: IconPositions;
  children?: string;
  disabled?: boolean;
  width?: number | 'auto' | '100%';
  onClick?: () => void;
};

export enum IconPositions {
  before,
  after,
}

export enum LabelSize {
  standard,
  small,
}

export enum LabelVariants {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  quaternary = 'quaternary',
}
