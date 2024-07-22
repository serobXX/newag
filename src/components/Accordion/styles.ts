import { Accordion } from '@mui/material';
import styled from 'styled-components';

import { Typography } from '..';

type TContainerProps = { $isFirst: boolean; $isLast: boolean; $isMobile: boolean };
type TCheapProps = { $backgroundColor: string; $isActive: boolean; $backgroundHoverColor?: string };
type TCheapPriceProps = { $padding: string; $opacity: number | string };

export const Container = styled.div<TContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.featureBackground};
  padding: ${({ $isMobile }) => ($isMobile ? '12px 0px' : '12px 16px')};
  border-top-right-radius: ${({ $isFirst }) => ($isFirst ? '8px' : 0)};
  border-top-left-radius: ${({ $isFirst }) => ($isFirst ? '8px' : 0)};
  border-bottom-left-radius: ${({ $isLast }) => ($isLast ? '8px' : 0)};
  border-bottom-right-radius: ${({ $isLast }) => ($isLast ? '8px' : 0)};
  width: 100%;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  padding: 4px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Cheap = styled.div<TCheapProps>`
  border-radius: 8px;
  background-color: ${({ $backgroundColor }) => $backgroundColor || '#e4eaed'};

  p {
    color: ${({ theme, $isActive }) => ($isActive ? theme.colors.lightSilver : theme.colors.black)};

    &:hover {
      color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.lightSilver : theme.colors.black};
    }
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme, $isActive, $backgroundHoverColor }) =>
    $backgroundHoverColor
      ? $backgroundHoverColor
      : $isActive
        ? theme.colors.piccoloHover
        : theme.colors.zru2TextNeutralUi100};
  }
`;

export const CheapPrice = styled(Typography)<TCheapPriceProps>`
  padding: ${({ $padding }) => $padding || '4px 14px'};
  opacity: ${({ $opacity }) => $opacity};
`;

export const AccordionRightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 0 0 0 ${({ theme }) => theme.spaces.m};
`;

export const AccordionWrapper = styled(Accordion)`
  &.MuiAccordion-root {
    box-shadow: none;
    position: initial;
    &.Mui-expanded {
      margin: 0px;
    }
  }
  .MuiAccordion-region {
    background-color: #f6f8f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const MainTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
