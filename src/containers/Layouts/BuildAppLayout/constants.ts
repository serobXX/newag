import { PATHS } from '~constants/paths';

export enum Pages {
  GENERAL = 'general',
  CUSTOMIZATION = 'customization',
  FEATURE = 'feature',
  PLUGINS = 'plugins',
}

export const menuItems = (baseRoute: string = PATHS.CREATE_APP) => [
  {
    name: Pages.GENERAL,
    id: 1,
    route: `/${baseRoute}`,
  },
  {
    name: Pages.CUSTOMIZATION,
    id: 2,
    route: `/${baseRoute}/${PATHS.CUSTOMIZATION}`,
  },
  {
    name: Pages.FEATURE,
    id: 3,
    route: `/${baseRoute}/${PATHS.FEATURE}`,
  },
  // {
  //   name: Pages.PLUGINS,
  //   id: 4,
  //   route: `/${baseRoute}/${PATHS.PLUGINS}`,
  // },
];
export const editmenuItems = (baseRoute: string = PATHS.CREATE_APP) => [
  {
    name: Pages.GENERAL,
    id: 1,
    route: `/${baseRoute}`,
  },
  {
    name: Pages.CUSTOMIZATION,
    id: 2,
    route: `/${baseRoute}/${PATHS.CUSTOMIZATION}`,
  },
  {
    name: Pages.FEATURE,
    id: 3,
    route: `/${baseRoute}/${PATHS.FEATURE}`,
  },
  {
    name: Pages.PLUGINS,
    id: 4,
    route: `/${baseRoute}/${PATHS.PLUGINS}`,
  },
];
