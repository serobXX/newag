import { PropsWithChildren, ReactNode } from 'react';
import { useTheme } from 'styled-components';

import { RightArrow } from '~assets/icons/button/RightArrow';
import { Colors } from '~types/colors';

import { StyledIconButton, StyledTypography, Wrapper } from './styles';

type TProps = PropsWithChildren & {
  text: string;
  onClick: () => void;
  closeModal: () => void;
  bgColor?: Colors;
  color?: Colors;
  rightContent?: ReactNode;
  className?: string
};

export const MainMenuItem = ({
  text,
  onClick,
  closeModal,
  bgColor,
  color,
  rightContent,
  className
}: TProps) => {
  const theme = useTheme();

  const handleMenuItemClick = () => {
    onClick();
    closeModal();
  };

  return (
    <Wrapper className={className} $bgColor={bgColor} onClick={handleMenuItemClick}>
      <StyledTypography $color={color}>{text}</StyledTypography>
      {rightContent && rightContent}
      {!rightContent && (
        <StyledIconButton>
          <RightArrow color={theme.colors.black} />
        </StyledIconButton>
      )}
    </Wrapper>
  );
};
