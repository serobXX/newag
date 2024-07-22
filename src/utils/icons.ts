import {
  APP_ICON_1,
  APP_ICON_2,
  APP_ICON_3,
  APP_ICON_4,
  APP_ICON_5,
  APP_ICON_6,
  APP_ICON_7,
  APP_ICON_8,
} from '../containers/pages/Customization/constants';

const ICONS = {
  1: APP_ICON_1,
  2: APP_ICON_2,
  3: APP_ICON_3,
  4: APP_ICON_4,
  5: APP_ICON_5,
  6: APP_ICON_6,
  7: APP_ICON_7,
  8: APP_ICON_8,
};

export const getRandomAppIcon = () =>
  ICONS[(Math.floor(Math.random() * 8) + 1) as keyof typeof ICONS];
