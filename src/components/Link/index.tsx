import { LinkProps } from '@mui/material';

import { StyledLink } from './styles';

export const Link = ({ children, ...rest }: LinkProps) => (
  <StyledLink {...rest}>{children}</StyledLink>
);
