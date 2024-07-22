import { Pagination } from '@mui/material';
import styled from 'styled-components';

export const StyledPagination = styled(Pagination)`
  .MuiPaginationItem-root {
    box-sizing: border-box;
    width: 48px;
    height: 42px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.zru2TextNeutralUi100};
    color: ${({ theme }) => theme.colors.zru2TextNeutralUi200TextLight};
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;

    &:hover,
    &:active {
      background-color: ${({ theme }) => theme.colors.zru2TextNeutralUi20};
    }

    &.MuiPaginationItem-ellipsis {
      width: 16px;
      height: 22px;
      letter-spacing: 2px;
      border: none;
      background-color: transparent;
    }

    &.MuiPaginationItem-previousNext {
      width: 22px;
      height: 32px;
      border: none;
      background-color: transparent;
      border-radius: 50%;
    }

    &.Mui-selected {
      background-color: rgba(10, 208, 113, 0.32);
      color: ${({ theme }) => theme.colors.white};
      border: none;

      &:hover,
      &:active {
        background-color: ${({ theme }) => theme.colors.zru2TextNeutralUi20};
        color: ${({ theme }) => theme.colors.zru2TextNeutralUi200TextLight};
        border: 1px solid ${({ theme }) => theme.colors.zru2TextNeutralUi100};
      }
    }
  }
`;
