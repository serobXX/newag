import styled, { css } from 'styled-components';

import { Colors } from '~types/colors';

import { TypographyVariant, TypographyVariantTypes } from './types';

type TProps = {
  color: Colors;
  variant: TypographyVariantTypes;
};

const TypographyTypes = {
  [TypographyVariant['super-large']]: css`
    font-weight: 700;
    font-size: 32px;
    line-height: 45px;
    font-feature-settings: 'clig' off, 'liga' off;
  `,
  [TypographyVariant['large']]: css`
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    font-feature-settings: 'clig' off, 'liga' off;
  `,
  [TypographyVariant['medium']]: css`
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
  `,
  [TypographyVariant['small']]: css`
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
  `,
  [TypographyVariant['m-500']]: css`
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  `,
  [TypographyVariant['m-600']]: css`
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  `,
  [TypographyVariant['m-700']]: css`
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
  `,
  [TypographyVariant['m-400']]: css`
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  `,
  [TypographyVariant['m-300']]: css`
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
  `,
  [TypographyVariant['s-600']]: css`
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
  `,
  [TypographyVariant['s-400']]: css`
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
  `,
  [TypographyVariant['s-300']]: css`
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
  `,
  [TypographyVariant['xs-500']]: css`
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
  `,
  [TypographyVariant['xs-600']]: css`
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
  `,
  [TypographyVariant['xs-400']]: css`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  `,
  [TypographyVariant['xs-300']]: css`
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
  `,
  [TypographyVariant['xxs-400']]: css`
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
  `,
  [TypographyVariant['xxs-500']]: css`
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
  `,
  [TypographyVariant['xxs-600']]: css`
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
  `,
  [TypographyVariant['xxxs-600']]: css`
    font-weight: 600;
    font-size: 8px;
    line-height: 10px;
  `,
};

export const Container = styled.p<TProps>`
  font-family: ${({ theme }) => theme.fontFamily.inter};
  color: ${({ color, theme }) => theme.colors[color]};
  margin: 0;
  padding: 0;
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ variant }) => TypographyTypes[variant as TypographyVariant]}
`;
