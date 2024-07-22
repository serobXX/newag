import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Text, VideoWrapper } from '../../styles';
import { useMediaQuery } from '@mui/material';
import { useTheme } from 'styled-components';


type TProps = {
  handleReset: () => void,
  activeStep: number,
  steps: any
}

export default function PublishStepper({ handleReset, activeStep, steps }: TProps) {
  const stepsPerSet = 3;
  const currentSetIndex = Math.floor(activeStep / stepsPerSet);
  const currentSetSteps = steps.slice(currentSetIndex * stepsPerSet, (currentSetIndex + 1) * stepsPerSet);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);



  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep % stepsPerSet}>
        {currentSetSteps.map((step: any, index: number) => (
          <Step key={index}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep >= steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you're finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>
            {/* <Typography variant="h6">{steps[activeStep].title}</Typography> */}
            <Text>
              <ul>
                {steps[activeStep].details.map((detail: any, idx: number) => (
                  <li key={idx}>
                    <Typography>{detail}</Typography>
                  </li>
                ))}
              </ul>
            </Text>

            <VideoWrapper $isMobile={isMobile}>
              <iframe
                width='100%'
                height={isMobile ? 'auto' : '380px'}
                src={steps[activeStep].video}
                title={steps[activeStep].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </VideoWrapper>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
