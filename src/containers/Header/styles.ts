import styled from 'styled-components';

import Button from '~components/buttons/Button/Button';
import { Typography } from '~components/index';

type TIsDesktopML = { $isDesktopML?: boolean };

export const Container = styled.div`
  width: 100%;
  padding: 21px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.header};
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  max-width: 1440px;
`;

export const MenuIconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.darkLabelText};
  width: 24px;
  height: 25px;
  cursor: pointer;
`;

export const ButtonsWrapper = styled.div<TIsDesktopML>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ $isDesktopML }) => ($isDesktopML ? 20 : 0)}px;

  @media ${({ theme }) => theme.breakpoints['--mobile']} {
    button:not(:last-child) {
      display: none;
    }
  }
`;

export const ButtonComponent = styled(Button)`
  padding: 4px 12px;
  margin: 0 9px;
`;

export const IconWrapper = styled.div`
  margin: 0 0 0 12px;
`;

export const ProfileButtonComponent = styled(Button)`
  padding: 4px 0;
  margin: 0 9px;
`;

export const Logo = styled(Typography)`
  cursor: pointer;
`;
