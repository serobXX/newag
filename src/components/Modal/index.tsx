import { useMediaQuery } from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';
import { MouseEvent, ReactNode } from 'react';
import { useTheme } from 'styled-components';

import { CloseIcon } from '~assets/icons/button/Close';
import { CircularProgress } from '~components/CircularProgress/CircularProgress';

import { Container, StyledDialog, StyledIconButton } from './styles';
import { TQuizList } from '~containers/QuizModal/types';

export interface TProps extends DialogProps {
  width?: number;
  height?: number;
  margin?: string;
  loading?: boolean;
  padding?: string;
  titleSlotContent?: ReactNode;
  actionsSlotContent?: ReactNode;
  list?: TQuizList[];
  onDownload?: () => void;
  onEdit?: () => void;
}

export const Modal = ({
  titleSlotContent,
  actionsSlotContent,
  loading,
  children,
  onClose,
  ...rest
}: TProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);

  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  return (
    <StyledDialog $isMobile={isMobile} onClose={onClose} {...rest}>
      <Container>
        <StyledIconButton onClick={handleClose} size='small'>
          <CloseIcon />
        </StyledIconButton>
        {titleSlotContent && <div>{titleSlotContent}</div>}
        <div>{loading ? <CircularProgress /> : children}</div>
        {actionsSlotContent && <div>{actionsSlotContent}</div>}
      </Container>
    </StyledDialog>
  );
};
