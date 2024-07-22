import { ButtonHTMLAttributes, FC, forwardRef, MouseEvent } from 'react';
import { useTheme } from 'styled-components';

import { CheckedIcon } from '~assets/icons/button/Checked';
import { ButtonTypes } from '~components/buttons/Button/types';
import { Colors } from '~types/colors';

import { ButtonComponent, Container, LabelChecked, TextWrapper, Wrapper } from './styles';

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  backgroundColor?: Colors;
  type?: ButtonTypes;
  disabled?: boolean;
  checked?: boolean;
  name?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const SquareButton: FC<TProps> = forwardRef<HTMLButtonElement, TProps>(
  (
    {
      type = ButtonTypes.button,
      disabled = false,
      backgroundColor = 'green',
      checked,
      name,
      children,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    
    const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (!disabled && onClick) {
        onClick(event);
      }
    };

    return (
      <Container>
        <Wrapper style={checked ? { backgroundColor: theme.colors.greenBg } : {}}>
          <ButtonComponent
            ref={ref}
            type={type}
            disabled={disabled}
            name={name}
            style={{ backgroundColor: theme.colors[backgroundColor] }}
            onClick={onClickHandler}
            {...rest}
          />
          {checked && (
            <LabelChecked>
              <CheckedIcon />
            </LabelChecked>
          )}
        </Wrapper>
        <TextWrapper variant='s-400'>{children}</TextWrapper>
      </Container>
    );
  },
);

SquareButton.displayName = 'Square Button';

export default SquareButton;
