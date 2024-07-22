import BreadcrumbsComponent from '@mui/material/Breadcrumbs';
import styled from 'styled-components';

import type { Colors } from '~types/colors';

type TProps = { $bgColor?: Colors; $width: number };

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div<TProps>`
  padding: 24px ${({ theme }) => theme.spaces.s} 12px ${({ theme }) => theme.spaces.s};
  width: 100%;
  max-width: ${({ $width }) => $width}px;
  background-color: ${({ theme, $bgColor }) =>
    $bgColor ? theme.colors[$bgColor] : theme.colors.lightBackground};
`;

export const StyledBreadcrumbsComponent = styled(BreadcrumbsComponent)`
  .MuiTypography-root,
  .MuiBreadcrumbs-ol,
  .MuiBreadcrumbs-separator,
  .MuiBreadcrumbs-li a {
    font-family: 'Inter';
    color: ${({ theme }) => theme.colors.monochromeGray};
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    text-decoration: none;
  }
`;
