import { ReactNode, useEffect } from 'react';
import { TourProvider, useTour } from '@reactour/tour';
import { mobiStyles, styles } from '~components/Tour/styles';
import './styles.css'
import { useMediaQuery } from "@mui/material";
import { useTheme } from 'styled-components';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { PATHS } from '~constants/paths';


type TProps = {
  children: ReactNode;
};



export const CTourProvider = ({ children }: TProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const { steps, isOpen } = useTour()

  return (
    <TourProvider
      className='helper'
      styles={isMobile ? mobiStyles : styles}
      afterOpen={(target) => {
        console.log('openned'); disableBodyScroll(document.body)
      }}
      beforeClose={(target) => {
        enableBodyScroll(document.body)
      }}
      disableDotsNavigation
      prevButton={() => null}
      onClickMask={({ currentStep, steps, setIsOpen }) => {
        if (steps) {
          if (currentStep === steps.length - 1) {
            setIsOpen(false)
          }
        }
      }}
      onClickClose={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        if (steps) {
          if (currentStep === steps.length - 1) {
            setIsOpen(false)
            enableBodyScroll(document.body)
          }
          setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
        }
        if (localStorage.firstVisit == 1) {
          window.location.href = `/${PATHS.MAIN}`
        }
      }}
      steps={steps}
    >
      {
        children
      }
    </TourProvider>

  )
};

