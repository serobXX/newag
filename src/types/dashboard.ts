import { TAppLayoutView } from '~hooks/create-app';

export type TWidgetResponse = {
  ok: boolean;
  data: {
    content?: string;
    caption?: string;
    name?: string;
    description?: string;
    contentType?: string;
    email?: string;
    created?: string;
    tabColorTheme?: string;
    colorPrimaryDark?: string;
    colorPrimary?: string;
    colorAccent?: string;
    tabsPosition?: string;
    navigationType?: TAppLayoutView;
    actionBar?: boolean;
    acid?: string;
    oneSignalAppId?: string;
    multisubmitToken?: string;
  };
};
