import { useEffect, useState } from 'react';



import { Clock, ClockWrapper, Container, OffText, Text, TextWrapper } from './styles';
import { Button } from '@mui/material';

type TProps = {
  isMobile?: boolean;
};

export const AlertBanner = ({
  isMobile = false,
}: TProps) => {



  return (
    <Container $isMobile={isMobile}>
      <TextWrapper $isMobile={isMobile}>
        {isMobile && (
          <OffText variant='large' color='white'>
            ALERT!
          </OffText>
        )}
        <Text color='white' $isMobile={isMobile}>
        </Text>
        <ClockWrapper $isMobile={isMobile}>
          <Clock color='white' $isMobile={isMobile}>
          </Clock>
        </ClockWrapper>
      </TextWrapper>

      <Button
        sx={{
          padding: "12px 16px",
          borderRadius: '100px',
          color: "black",
          background: "#BFFFEC",
          zIndex: 1,
          '&:hover': {
            backgroundColor: "#BFFFEC", // Set the same background color as normal state
          },

        }}
      >
        Read info
      </Button>
    </Container >
  );
};
