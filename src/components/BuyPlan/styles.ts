import styled, { css } from 'styled-components';

import { Label } from '~components/Label';
import { Typography } from '~components/Typography/Typography';

import { BuyPlanType } from './types';

type TContainerProps = { width: number | '100%'; $isActive: boolean };
type TIsActive = { $isActive: boolean };
type TType = { type: BuyPlanType };

export const Container = styled.div<TContainerProps>`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  padding: 22px;
  margin-top: 17.5px;
  border-radius: 32px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.supportive : theme.colors.white};
  ${({ $isActive }) =>
    !$isActive &&
    css`
      border: 1px solid rgba(0, 0, 0, 0.09);
    `};
`;

export const StyledLabel = styled(Label)`
  position: absolute;
  height: 35px;
  top: -17.5px;
  right: 50%;
  transform: translateX(50%);
  padding: 10px;
`;

export const StyledOffLabel = styled(Label)<TType>`
  position: absolute;
  top: ${({ type }) => (type === BuyPlanType.full ? 22 : -7)}px;
  right: ${({ type }) => (type === BuyPlanType.full ? 22 : 0)}px;
  height: ${({ type }) => (type === BuyPlanType.full ? 35 : 24)}px;
  padding: ${({ type }) => (type === BuyPlanType.full ? 10 : 6)}px;
  border-radius: 8px;
`;

export const Wrapper = styled.div<TType>`
  ${({ type }) =>
    type === BuyPlanType.short &&
    css`
      display: flex;
      justify-content: space-between;
    `};
`;

export const PlanName = styled(Typography)<TIsActive & TType>`
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.white : theme.colors.black)};
  font-size: ${({ type }) => (type === BuyPlanType.full ? 28 : 22)}px;
  font-style: normal;
  font-weight: ${({ type }) => (type === BuyPlanType.full ? 800 : 700)};
  line-height: ${({ type }) => (type === BuyPlanType.full ? 34 : 27)}px;
`;

export const DescriptionWrapper = styled.div<TIsActive>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.white : theme.colors.black)};
`;

export const DescriptionText = styled(Typography)`
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

export const ButtonWrapper = styled.div<TType>`
  margin-top: ${({ type }) => (type === BuyPlanType.full ? 20 : 18)}px;
  position: relative;
`;

export const PriceBeforeText = styled(Typography)<TType & TIsActive>`
  padding-top: ${({ type }) => (type === BuyPlanType.full ? 8 : 0)}px;
  text-decoration: line-through;
  text-decoration-thickness: 1px;
  text-decoration-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.lightViolet : theme.colors.monochromeGray};
  text-align: ${({ type }) => (type === BuyPlanType.full ? 'start' : 'end')};
  font-size: ${({ type }) => (type === BuyPlanType.full ? 15 : 10)}px;
  font-weight: 500;
  line-height: ${({ type }) => (type === BuyPlanType.full ? 18 : 12)}px;
`;
