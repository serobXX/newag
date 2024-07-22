import { Drawer } from '@mui/material';
import { PropsWithChildren } from 'react';

import { MenuCloseIcon } from '~assets/icons/button/MenuClose';

import { CloseButtonWrapper, StyledIconButton, Wrapper } from './styles';

type TProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
};

export const DropdownMenu = ({ open, onClose, children }: TProps) => {
  return (
    <Drawer open={open} onClose={onClose} anchor='left'>
      <Wrapper>
        <CloseButtonWrapper>
          <StyledIconButton onClick={onClose} size='small'>
            <MenuCloseIcon />
          </StyledIconButton>
        </CloseButtonWrapper>
        <div>{children}</div>
      </Wrapper>
    </Drawer>
  );
};
