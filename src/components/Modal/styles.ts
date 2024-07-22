import { Dialog, IconButton } from '@mui/material';
import styled, { css } from 'styled-components';

type TDialogProps = {
  width?: number;
  height?: number;
  margin?: string;
  padding?: string;
  $isMobile: boolean;
};

export const StyledDialog = styled(Dialog) <TDialogProps>`
  .MuiDialog-paper {
    box-sizing: ${({ $isMobile }) => ($isMobile ? 'none' : 'border-box')};
    position: relative;
    max-width: 1040px;
    box-shadow: none;
    border-radius: 22px;
    border-bottom-left-radius: ${({ $isMobile }) => ($isMobile ? 0 : '22px')};
    border-bottom-right-radius: ${({ $isMobile }) => ($isMobile ? 0 : '22px')};
    background-color: ${({ theme }) => theme.colors.lightSilver};
    width: ${({ width }) => (width ? `${width}px` : 'auto')};
    height: ${({ height }) => (height ? `${height}px` : 'auto')};
    padding: ${({ padding }) => padding || ' 41px 51px 27px 57px'};
    overflow: hidden;
    ${({ margin }) =>
    margin &&
    css`
        margin: ${margin};
      `};
  }

  .MuiDialog-container {
    align-items: ${({ $isMobile }) => ($isMobile ? 'end' : 'center')};
  }
`;

export const Container = styled.div`
  overflow: auto;
  padding-right: 5px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 24px;
    background: ${({ theme }) => theme.colors.lightGrey};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background: ${({ theme }) => theme.colors.middleGrey};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.monochromeGray};
  }
`;

export const StyledIconButton = styled(IconButton)`
  &.MuiButtonBase-root {
    position: absolute;
    top: 18px;
    right: 26px;
    padding: 0;
    z-index: 9999;
  }
`;
