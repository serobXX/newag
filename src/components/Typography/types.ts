export enum TypographyVariant {
  'super-large' = 'super-large',
  large = 'large',
  medium = 'medium',
  small = 'small',
  'm-700' = 'm-700',
  'm-600' = 'm-600',
  'm-500' = 'm-500',
  'm-400' = 'm-400',
  'm-300' = 'm-300',
  's-600' = 's-600',
  's-400' = 's-400',
  's-300' = 's-300',
  'xs-600' = 'xs-600',
  'xs-500' = 'xs-500',
  'xs-400' = 'xs-400',
  'xs-300' = 'xs-300',
  'xxs-400' = 'xxs-400',
  'xxs-500' = 'xxs-500',
  'xxs-600' = 'xxs-600',
  'xxxs-600' = 'xxxs-600',
}

export type TypographyVariantTypes = keyof typeof TypographyVariant;
