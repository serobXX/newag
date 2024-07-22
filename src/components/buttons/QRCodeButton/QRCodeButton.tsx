import { ButtonHTMLAttributes, FC, forwardRef, MouseEvent } from 'react';

import { BarcodeIcon } from '~assets/icons/button/Barcode';
import { ButtonTypes } from '~components/buttons/Button/types';

import { ButtonComponent, Container, TextWrapper } from './styles';

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  type?: ButtonTypes;
  disabled?: boolean;
  name?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const QRCodeButton: FC<TProps> = forwardRef<HTMLButtonElement, TProps>(
  ({ text, type = ButtonTypes.button, disabled = false, name, onClick, ...rest }, ref) => {
    const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (!disabled && onClick) {
        onClick(event);
      }
    };

    return (
      <Container>
        <ButtonComponent
          ref={ref}
          type={type}
          disabled={disabled}
          name={name}
          onClick={onClickHandler}
          {...rest}
        >
          <BarcodeIcon />
        </ButtonComponent>

        <TextWrapper variant='xs-400'>{text}</TextWrapper>
      </Container>
    );
  },
);

QRCodeButton.displayName = 'Barcode Button';

export default QRCodeButton;
