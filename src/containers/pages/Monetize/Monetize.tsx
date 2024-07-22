import useWindowDimensions from '~hooks/use-window-dimensions';
import { getBuildEnvVar } from '~utils/env';
import WarningIcon from "../../../assets/img/banners/warningicon.svg"
import { HEADER_HEIGHT, NAVIGATION_HEIGHT } from '../constants';
import { ButtonComponent, WarningContainer, Wrapper, Container } from './styles';
import { useTour } from '@reactour/tour';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '~constants/paths';
import { useMediaQuery } from '@mui/material';
import { useTheme } from 'styled-components';
import { useAuth } from '~hooks/auth';
import { useDashboard } from '~hooks/dashboard';
import { t } from 'i18next';

export const Monetize = () => {
  const { height } = useWindowDimensions();
  const navigate = useNavigate();
  const { setCurrentStep, currentStep, setIsOpen } = useTour()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const { appList } = useDashboard()
  const { firstVisit } = useAuth()
  const handleCreateApp = () => {
    navigate(`/${PATHS.CREATE_APP}`, {
      relative: 'path',
    });

  };

  useEffect(() => {
    if (firstVisit && !isMobile && currentStep == 3) {
      setCurrentStep(3)
      setIsOpen(false)
      navigate(`/${PATHS.MAIN}`)
    }
  }, [currentStep])

  return (
    <>
      {
        !!appList.length ?
          <Wrapper
            $height={height - HEADER_HEIGHT - NAVIGATION_HEIGHT}
            src={`${getBuildEnvVar('API_BASE_PATH')}/dashboard/monetize/?iframe=true`}
          ></Wrapper> :
          <Container>
            <WarningContainer $isMobile={isMobile}>
              <img width={50} src={WarningIcon} />
              <h2>You have no apps.</h2>
              {/* {isAuth && ( */}
              <ButtonComponent onClick={handleCreateApp}>
                {t('create-app')}
              </ButtonComponent>
              {/* )} */}
            </WarningContainer>
          </Container>
      }
    </>
  );
};
