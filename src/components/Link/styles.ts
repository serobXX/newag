import { Link } from '@mui/material';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  &.MuiTypography-root {
    color: ${({ theme }) => theme.colors.supportiveWhis10};
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    text-decoration-line: underline;
  }
`;
