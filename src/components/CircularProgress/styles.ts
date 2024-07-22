import CircularComponent from '@mui/joy/CircularProgress';
import styled from 'styled-components';

import { Colors } from '~types/colors';

type TCircular = {
  $strokeColor: Colors;
};

export const Circular = styled(CircularComponent)<TCircular>`
  .MuiCircularProgress-progress {
    stroke: ${({ theme, $strokeColor }) => theme.colors[$strokeColor]};
  }
`;
