import styled from 'styled-components';

type TProps = {
  $isactive?: boolean;
};

export const Container = styled.button<TProps>`
  padding: 12px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border: none;
  cursor: pointer;
  width: 100%;
  background: ${({ theme, $isactive }) =>
    $isactive ? theme.colors.lightGreen : theme.colors.transparent};

  &:disabled {
    cursor: not-allowed;
  }
`;
