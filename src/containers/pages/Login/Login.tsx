import useWindowDimensions from '~hooks/use-window-dimensions';
import { getBuildEnvVar } from '~utils/env';

import { HEADER_HEIGHT, NAVIGATION_HEIGHT } from '../constants';
import { Container, Iframe, Wrapper } from './styles';
import { useEffect } from 'react';
import { PATHS } from '~constants/paths';
import { useNavigate } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import { Card, useMediaQuery } from '@mui/material';
import { useTheme } from 'styled-components';
import { useAuth } from '~hooks/auth';

export const Login = () => {
  const { height } = useWindowDimensions();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);



  return (
    <Wrapper>
      <Card style={{ width: '80%', borderRadius: "16px" }}>
        <Container $height={height - HEADER_HEIGHT - NAVIGATION_HEIGHT}>
          <Iframe src={`${getBuildEnvVar('API_BASE_PATH')}/login?returl=https://${window.location.hostname}/create-app`} />
        </Container>
      </Card>

    </Wrapper>
  );
};
