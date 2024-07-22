import styled from 'styled-components';

import { Colors } from '~types/colors';

type TProps = {
  $backgroundColor?: Colors;
};

export const Container = styled.div<TProps>`
  height: 10px;
  background-color: ${({ theme, $backgroundColor = 'lightSilver' }) =>
    theme.colors[$backgroundColor]};
  border-radius: 50px;
  margin: 10px 0;
`;

export const Label = styled.span`
  padding: 8px;
  border-radius: 100px;
  color: white;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.supportive10};
`;
