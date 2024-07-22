import { MenuItemProps } from '@mui/material/MenuItem';

import { MenuItemComponent } from './styles';

export const HeaderMenuItem = ({ children, ...props }: MenuItemProps) => (
  <MenuItemComponent {...props}>{children}</MenuItemComponent>
);
