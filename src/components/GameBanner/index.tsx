import { Colors } from '~types/colors';

import { Container, Inner, LevelButton, Subtext, Subtitle, TextWrapper } from './styles';
import Incognito from '~assets/img/banners/incognito.svg';
import Adventurer from '~assets/img/banners/adventurer.svg';
import Unknown from '~assets/img/banners/unknow.svg';
import MoneyMaker from '~assets/img/banners/moneymakers.svg';
import RichGuy from '~assets/img/banners/richguy.svg';

type TProps = {
  className?: string,
  title: string;
  subtitle: string;
  color: string
  bgColor: Colors;
  buttonBgColor: Colors;
  bgImage: string;
  onButtonClick: () => void;
  isMobile?: boolean;
  width?: number | '100%';
  innerStyles?: object;
  containerStyles?: object;
};

export const GameBanner = ({
  className,
  title,
  subtitle,
  color,
  bgColor,
  width = '100%',
  bgImage,
  containerStyles,
  innerStyles,
  isMobile = false,
  onButtonClick,
}: TProps) => {
  const images: any = {
    'Anonymous': Incognito,
    'Adventurer': Adventurer,
    'Money Maker': MoneyMaker,
    'Rich Guy': RichGuy
  }

  return (
    <Container className={className} width={width} $isMobile={isMobile} style={containerStyles}>
      <Inner $bgColor={bgColor} $bgImage={images[bgImage] ? images[bgImage] : Unknown} width={width} style={innerStyles}>
        <TextWrapper>
          <LevelButton $color={color}>{title}</LevelButton>
          <Subtitle Component='h4' variant='xs-400'>
            {subtitle}
          </Subtitle>
        </TextWrapper>

      </Inner>
    </Container>
  );
};
