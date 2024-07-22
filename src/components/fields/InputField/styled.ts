import styled from 'styled-components';

import { Typography } from '../..';

export const Label = styled(Typography)`
  margin: 0 0 ${({ theme }) => theme.spaces.s} 0;
`;

export const Text = styled(Typography)`
  margin: ${({ theme }) => theme.spaces.s} 0 0 0;
`;

export const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spaces.s} 0;
  width: 100%;
`;
