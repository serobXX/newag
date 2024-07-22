import styled from 'styled-components';

import { Typography } from '../..';

type TPadding = { padding?: string };

export const Text = styled(Typography)`
  margin: ${({ theme }) => theme.spaces.s} 0 0 0;
`;

export const Wrapper = styled.div<TPadding>`
  padding: ${({ padding, theme }) => padding || `${theme.spaces.s} 0`};
  width: 100%;

  & .MuiFormControlLabel-root {
    margin: 0;
    margin-top: 10px;
  }
`;
