import useWindowDimensions from '~hooks/use-window-dimensions';
import { getBuildEnvVar } from '~utils/env';

import { HEADER_HEIGHT, NAVIGATION_HEIGHT } from '../constants';
import { Wrapper } from './styles';

export const Faq = () => {
  const { height } = useWindowDimensions();

  return (
    <Wrapper
      $height={height - HEADER_HEIGHT - NAVIGATION_HEIGHT}
      src={`https://appsgeyser.com/support/faq/`}
    ></Wrapper>
  );
};
