import { MenuProps } from '@mui/material/Menu';

import { MenuComponent } from './styles';

export const HeaderMenu = ({ children, ...props }: MenuProps) => (
  <MenuComponent
    {...props}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: -10,
    }}
  >
    {children}
  </MenuComponent>
);
