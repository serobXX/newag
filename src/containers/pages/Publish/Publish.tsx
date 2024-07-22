
import { HEADER_HEIGHT, NAVIGATION_HEIGHT } from '../constants';
import { WarningContainer, Wrapper, Container, ButtonComponent, Main, BlockWrapper } from './styles';
import { useEffect } from 'react';
import { PATHS } from '~constants/paths';
import { useNavigate } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import { useMediaQuery } from '@mui/material';
import { useTheme } from 'styled-components';
import { t } from 'i18next';
import WarningIcon from "../../../assets/img/banners/warningicon.svg"
import { useDashboard } from '~hooks/dashboard';
import { useAuth } from '~hooks/auth';
import PubBannerImg from '../../../assets/img/banners/publisher-banner.svg'
import { PublishCard } from './cards/PublishCard';
import { SelfPublishCard } from './cards/SelfPublishCard';

export const Publish = () => {
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
          <Main $isMobile={isMobile}>
            <BlockWrapper $isMobile={isMobile}>
              <img src={PubBannerImg} />
              <PublishCard />
              <SelfPublishCard />
            </BlockWrapper>

          </Main> :
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
