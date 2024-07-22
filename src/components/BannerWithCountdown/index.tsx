import { useEffect, useState } from 'react';

import Button from '~components/buttons/Button/Button';

import { Clock, ClockWrapper, Container, OffText, Text, TextWrapper } from './styles';
import { formatTime } from './utils';

type TProps = {
  initialRestTime: number;
  offText: string;
  text: string;
  buttonText: string;
  onButtonClick: () => void;
  isMobile?: boolean;
};

export const BannerWithCountdown = ({
  initialRestTime,
  offText,
  text,
  buttonText,
  isMobile = false,
  onButtonClick,
}: TProps) => {
  const [time, setTime] = useState(initialRestTime);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time !== 0) {
        setTime((prev) => prev - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  return (
    <Container $isMobile={isMobile}>
      <TextWrapper $isMobile={isMobile}>
        {!isMobile && (
          <OffText variant='large' color='white'>
            {offText}
          </OffText>
        )}
        <Text color='white' $isMobile={isMobile}>
          {text}
        </Text>
        <ClockWrapper $isMobile={isMobile}>
          <Clock color='white' $isMobile={isMobile}>
            {formatTime(time)}
          </Clock>
        </ClockWrapper>
      </TextWrapper>
      {!isMobile && (
        <Button
          onClick={onButtonClick}
          width={131}
          backgroundColor={'supportiveCell10'}
          variant='tertiary'
          textVariant='m-500'
        >
          {buttonText}
        </Button>
      )}
    </Container>
  );
};
