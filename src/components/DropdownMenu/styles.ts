import { IconButton } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  width: 320px;
  height: 300px;
`;

export const CloseButtonWrapper = styled.div`
  display: flex;
  padding: 12px 16px;
`;

export const StyledIconButton = styled(IconButton)`
  &.MuiButtonBase-root {
    box-sizing: border-box;
    width: 32px;
    height: 32px;
  }
`;
