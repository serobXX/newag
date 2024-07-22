import styled from 'styled-components';

type THeight = { $height: number };

export const Wrapper = styled.iframe<THeight>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  border: none;
`;
