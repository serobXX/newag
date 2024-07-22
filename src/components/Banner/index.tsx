import Button from '~components/buttons/Button/Button';
import { Colors } from '~types/colors';

import { Container, Inner, Subtitle, TextWrapper, Title } from './styles';

type TProps = {
  className?: string,
  title: string;
  subtitle: string;
  buttonText: string;
  bgColor: Colors;
  buttonBgColor: Colors;
  bgImage: string;
  onButtonClick: () => void;
  isMobile?: boolean;
  width?: number | '100%';
  innerStyles?: object;
  containerStyles?: object;
};

export const Banner = ({
  className,
  title,
  subtitle,
  buttonText,
  bgColor,
  width = '100%',
  buttonBgColor,
  bgImage,
  containerStyles,
  innerStyles,
  isMobile = false,
  onButtonClick,
}: TProps) => {
  return (
    <Container className={className} width={width} $isMobile={isMobile} style={containerStyles}>
      <Inner $bgColor={bgColor} $bgImage={bgImage} width={width} style={innerStyles}>
        <TextWrapper>
          <Title Component='h3'>{title}</Title>
          <Subtitle Component='h4' variant='xs-400'>
            {subtitle}
          </Subtitle>
        </TextWrapper>
        <Button
          backgroundColor={buttonBgColor}
          variant='tertiary'
          color='white'
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Inner>
    </Container>
  );
};
