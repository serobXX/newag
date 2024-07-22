import {} from 'styled-components';

import { themes } from './';

type TTheme = typeof themes.light;

declare module 'styled-components' {
  export interface DefaultTheme extends TTheme {}
}
