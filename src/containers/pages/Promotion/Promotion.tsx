import useWindowDimensions from '~hooks/use-window-dimensions';
import { getBuildEnvVar } from '~utils/env';

import { HEADER_HEIGHT, NAVIGATION_HEIGHT } from '../constants';
import { Wrapper } from './styles';

export const Promotion = () => {
  const { height } = useWindowDimensions();

  return (
    <Wrapper
      $height={height - HEADER_HEIGHT - NAVIGATION_HEIGHT}
      src={`${getBuildEnvVar('API_BASE_PATH')}/promotion/?iframe=true`}
    ></Wrapper>
  );
};
