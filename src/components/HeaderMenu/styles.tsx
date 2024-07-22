import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from 'styled-components';

export const MenuComponent = styled(Menu)`
  .MuiMenu-paper {
    background-color: ${({ theme }) => theme.colors.lightSilver};
    box-shadow: 0px 0px 70px 0px rgba(0, 0, 0, 0.06);
    border-radius: ${({ theme }) => theme.spaces.m};
    padding: 4px 16px;

    ul {
      padding: 0;
    }

    .MuiMenuItem-root {
      &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.metalsSilver};
      }
    }
  }
`;

export const MenuItemComponent = styled(MenuItem)`
  &.MuiMenuItem-root {
    padding: 12px 0;
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily.inter};
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.m};

    &:hover {
      background: none;
      opacity: 0.8;
    }
  }

  .MuiTouchRipple-root {
    display: none;
  }
`;
