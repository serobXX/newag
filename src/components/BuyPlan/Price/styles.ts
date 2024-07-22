import styled from 'styled-components';

import { Typography } from '~components/Typography/Typography';

import { BuyPlanType } from '../types';

type TType = { type: BuyPlanType };

export const Container = styled.div<TType>`
  display: flex;
  margin-top: ${({ type }) => (type === BuyPlanType.full ? 4 : 2)}px;
`;

export const PriceValueText = styled(Typography)<TType>`
  font-size: ${({ type }) => (type === BuyPlanType.full ? 36 : 22)}px;
  font-weight: ${({ type }) => (type === BuyPlanType.full ? 800 : 700)};
  line-height: ${({ type }) => (type === BuyPlanType.full ? 46 : 27)}px;
`;

export const PricePeriodText = styled(Typography)<TType>`
  align-self: flex-end;
  font-size: ${({ type }) => (type === BuyPlanType.full ? 17 : 14)}px;
  font-weight: ${({ type }) => (type === BuyPlanType.full ? 500 : 400)};
  line-height: ${({ type }) => (type === BuyPlanType.full ? 32 : 22)}px;
`;
