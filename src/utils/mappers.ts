import { load } from 'cheerio';

import {
  TAppLayoutView,
  TBlog,
  TFacebook,
  TMap,
  TTwitter,
  TWhatsApp,
  TYouTube,
} from '~hooks/create-app';
import { TUrlValidateParams } from '~types/preview';

import { APP_ICON_1 } from '../containers/pages/Customization/constants';
import { TQuizList, TQuizValue } from '~containers/QuizModal/types';

export type TParam = { [k: string]: string | number | boolean };

export type TColor = {
  colorPrimary: string;
  colorPrimaryDark: string;
  colorAccent: string;
};

export type TCreateAppParams = {
  url: string;
  whatsApp: TWhatsApp | null;
  facebook: TFacebook | null;
  twitter: TTwitter | null;
  youtube: TYouTube | null;
  blog: TBlog | null;
  map: TMap | null;
  appLayoutView: TAppLayoutView;
  actionBar: boolean;
  color: TColor;
  appIcon: string;
  appName: string;
  email?: string;
  quiz?: TQuizValue[]
};

export type TEditAppParams = {
  url: string;
  name: string;
  description: string;
  color: TColor;
  appIcon: string;
  appName: string;
  widgetId: string;
  multisubmitToken: string;
};

export type TEditAppTabsParams = {
  appLayoutView: TAppLayoutView;
  actionBar: boolean;
  acid: string;
};

export type TSaveOneSignalAppIdParams = {
  userOneSignalId: string;
  saveOneSignalId: string;
};

export const createAppMapper = ({
  url,
  whatsApp,
  facebook,
  twitter,
  youtube,
  blog,
  map,
  appLayoutView,
  actionBar,
  color: { colorPrimary, colorPrimaryDark, colorAccent },
  appIcon,
  appName,
  email,
  quiz
}: TCreateAppParams) => {
  const additionalParams = [{ 'UrlWithTabsModelForm[field_email]': email }].filter(
    (value) => !!Object.values(value)[0],
  ) as TParam[];

  const params: TParam[] = [
    { quizQuestions: JSON.stringify(quiz) || '' },
    { 'UrlWithTabsModelForm[url]': url },
    {
      'UrlWithTabsModelForm[listTemplate]': `${JSON.stringify(
        [
          [{ visible: !!twitter, value: 'twitterV2' }],
          [{ visible: !!facebook, value: 'facebookPageV3' }],
          [{ visible: !!youtube, value: 'youtubeChannel' }],
          [{ visible: !!whatsApp, value: 'whatsappTab' }],
          [{ visible: !!map, value: 'map' }],
          [{ visible: !!blog, value: 'blogV2' }],
        ]
          .filter((value) => value[0].visible)
          .map((value) => [value[0].value]),
      )}`,
    },
    { 'CustomModelForm[twitterUrl]': twitter?.url ?? '' },
    { template: 'twitterV2' },
    { 'CustomModelForm[facebookUrl]': facebook?.url ?? '' },
    { template: 'facebookPageV3' },
    { 'CustomModelForm[apikey]': youtube?.apiKey ?? '' },
    { 'CustomModelForm[inputType]': youtube?.inputType ?? 'channelUrl' },
    { 'CustomModelForm[channel]': youtube?.url ?? '' },
    { 'CustomModelForm[playList]': youtube?.splitChannel ? 2 : 1 },
    { 'CustomModelForm[styling][colorsFromTheme]': false },
    { 'CustomModelForm[styling][colorsFromTheme]': 1 },
    { 'CustomModelForm[styling][colorPrimary]': colorPrimary?.replace('#', '') ?? '2196f3' },
    {
      'CustomModelForm[styling][colorPrimaryDark]': colorPrimaryDark?.replace('#', '') ?? '1976D2',
    },
    { 'CustomModelForm[styling][colorAccent]': colorAccent?.replace('#', '') ?? '448aff' },
    { template: 'youtubeChannel' },
    { 'CustomModelForm[locationFrame]': map?.html ?? '' },
    { template: 'map' },
    { 'CustomModelForm[number]': whatsApp?.number.replaceAll(' ', '') ?? '' },
    { 'CustomModelForm[message]': whatsApp?.message ?? '' },
    { 'CustomModelForm[backgroundColor]': 'f0f4f9' },
    { 'CustomModelForm[buttonColor]': '25d466' },
    { 'CustomModelForm[buttonText]': whatsApp?.buttonText ?? 'Contact Us' },
    { template: 'whatsappTab' },
    { 'CustomModelForm[blogType]': blog?.blogType ?? 'rss' },
    { 'CustomModelForm[blogUrl]': blog?.url ?? '' },
    { 'CustomModelForm[notificationsEnabled]': blog?.enablePushNotifications ?? false },
    { 'CustomModelForm[notificationsEnabled]': blog?.enablePushNotifications ? 2 : 1 },
    { 'CustomModelForm[styling][colorsFromTheme]': false },
    { 'CustomModelForm[styling][colorsFromTheme]': 1 },
    { 'CustomModelForm[styling][colorPrimary]': colorPrimary?.replace('#', '') ?? '2196f3' },
    {
      'CustomModelForm[styling][colorPrimaryDark]': colorPrimaryDark?.replace('#', '') ?? '1976D2',
    },
    { 'CustomModelForm[styling][colorAccent]': colorAccent?.replace('#', '') ?? '448aff' },
    { template: 'blogV2' },
    { 'NavigationTypeWidget[navigation_type]': appLayoutView ?? 'SLIDER' },
    { 'NavigationTypeWidget[action_bar]': actionBar ?? false },
    { 'NavigationTypeWidget[tabs_position]': 'top' },
    { custom_colorPrimaryDark: colorPrimaryDark || ' #4a148c' },
    { custom_colorPrimary: colorPrimary ?? '#9c27b0' },
    { custom_colorAccent: colorAccent ?? ' #e040fb' },
    { 'UrlWithTabsModelForm[tab_color_theme]': 'custom' },
    { 'UrlWithTabsModelForm[name]': appName ?? '' },
    { icon: appIcon ?? APP_ICON_1 },
    { 'UrlWithTabsModelForm[icon]': 'custom' },
    { generatedIcon: appIcon ?? APP_ICON_1 },
    ...additionalParams,
  ];

  const data = params
    .map((value) => {
      const key = Object.keys(value)[0];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value[key])}`;
    })
    .join('&');

  return data;
};

export const editAppMapper = ({
  url,
  name,
  description,
  color: { colorPrimary, colorPrimaryDark, colorAccent },
  appIcon,
  appName,
  widgetId,
  multisubmitToken,
}: TEditAppParams) => {
  const isCustomIcon = !appIcon.includes('geticon.php');

  const params: TParam[] = [
    { 'UrlWithTabsModelForm[url]': url },
    {
      'UrlWithTabsModelForm[listTemplate]': '',
    },
    { 'UrlWithTabsModelForm[widget_caption]': appName },
    { 'UrlWithTabsModelForm[name]': name ?? '' },
    { 'UrlWithTabsModelForm[description]': description ?? '' },
    {
      icon: isCustomIcon ? appIcon ?? APP_ICON_1 : `/geticon.php?wid=${widgetId}`,
    },
    { 'UrlWithTabsModelForm[icon]': isCustomIcon ? 'custom' : 'default' },
    { custom_colorPrimaryDark: colorPrimaryDark || ' #4a148c' },
    { custom_colorPrimary: colorPrimary ?? '#9c27b0' },
    { custom_colorAccent: colorAccent ?? ' #e040fb' },
    { 'UrlWithTabsModelForm[tab_color_theme]': 'custom' },
    { yt0: 'SAVE' },
    { 'UrlWithTabsModelForm[widget_id]': widgetId },
    { 'UrlWithTabsModelForm[field_email]': '' },
    { selected_widget: widgetId },
    { multisubmit_token: multisubmitToken },
  ];

  const data = params
    .map((value) => {
      const key = Object.keys(value)[0];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value[key])}`;
    })
    .join('&');

  return data;
};

export const editAppTabsMapper = ({ appLayoutView, actionBar, acid }: TEditAppTabsParams) => {
  const params: TParam[] = [
    { 'NavigationTypeWidget[navigation_type]': appLayoutView ?? 'SLIDER' },
    {
      'NavigationTypeWidget[tabs_position]': 'top',
    },
    { 'NavigationTypeWidget[action_bar]': actionBar ?? false },
    { [`NavigationTypeWidget[tabIcon][${acid}]`]: '' },
    { saveTabsPositionsWidget: 1 },
  ];

  const data = params
    .map((value) => {
      const key = Object.keys(value)[0];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value[key])}`;
    })
    .join('&');

  return data;
};

export const validateMapper = ({ url, YII_CSRF_TOKEN }: TUrlValidateParams) => {
  const params: TParam[] = [{ url: url }, { YII_CSRF_TOKEN: YII_CSRF_TOKEN }];

  const data = params
    .map((value) => {
      const key = Object.keys(value)[0];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value[key])}`;
    })
    .join('&');

  return data;
};

export const oneSignalAppIdMapper = ({
  userOneSignalId,
  saveOneSignalId,
}: TSaveOneSignalAppIdParams) => {
  const params: TParam[] = [
    { 'PushModelForm[userOneSignalId]': userOneSignalId },
    { saveOneSignalId },
  ];

  const data = params
    .map((value) => {
      const key = Object.keys(value)[0];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value[key])}`;
    })
    .join('&');

  return data;
};

export const premiumMapper = (html: string) => {
  const $ = load(html);

  const master = {
    planId: (
      $('.planMaster').attr('data-new-plan-id') ||
      $('.planMaster').attr('data-plan') ||
      'MASTER_3110'
    ).replace(/_(monthly|yearly)/g, ''),
    planName:
      $('.planMaster').attr('data-new-plan-name') ||
      $('.planMaster').attr('data-plan-name') ||
      'MASTER',
    monthly: parseFloat(
      $('.priceAmount')
        .slice(2, 3)
        ?.text()
        ?.replace(/[^.0-9]/g, '') || '0',
    ),
    beforeMonthly: parseFloat(
      $('.oldPriceAmount')
        .slice(2, 3)
        ?.text()
        ?.replace(/[^.0-9]/g, '') || '0',
    ),
    yearly: parseFloat(
      $('.priceAmount')
        .slice(3, 4)
        ?.text()
        ?.replace(/[^.0-9]/g, '') || '0',
    ),
    beforeYearly: parseFloat(
      $('.oldPriceAmount')
        .slice(3, 4)
        ?.text()
        ?.replace(/[^.0-9]/g, '') || '0',
    ),
  };

  const individual = {
    planId: (
      $('.planIndividual').attr('data-new-plan-id') ||
      $('.planIndividual').attr('data-plan') ||
      'INDIVIDUAL_3110'
    ).replace(/_(monthly|yearly)/g, ''),
    planName:
      $('.planIndividual').attr('data-new-plan-name') ||
      $('.planIndividual').attr('data-plan-name') ||
      'INDIVIDUAL',
    monthly: parseFloat(
      $('.priceAmount')
        .slice(4, 5)
        ?.text()
        ?.replace(/[^.0-9]/g, '') || '0',
    ),
    beforeMonthly: parseFloat(
      $('.oldPriceAmount')
        .slice(4, 5)
        ?.text()
        ?.replace(/[^.0-9]/g, '') || '0',
    ),
    yearly: parseFloat(
      $('.priceAmount')
        .slice(5, 6)
        ?.text()
        ?.replace(/[^.0-9]/g, '') || '0',
    ),
    beforeYearly: parseFloat(
      $('.oldPriceAmount')
        .slice(5, 6)
        ?.text()
        ?.replace(/[^.0-9]/g, '') || '0',
    ),
  };

  const starter = {
    planId: (
      $('.planStarter').attr('data-new-plan-id') ||
      $('.planStarter').attr('data-plan') ||
      'STARTER_3110'
    ).replace(/_(monthly|yearly)/g, ''),
    planName:
      $('.planStarter').attr('data-new-plan-name') ||
      $('.planStarter').attr('data-plan-name') ||
      'STARTER',
    monthly: parseFloat(
      $('.priceAmount')
        .slice(0, 1)
        ?.text()
        ?.replace(/[^.0-9]/g, '') || '0',
    ),
    beforeMonthly: parseFloat(
      $('.oldPriceAmount')
        .slice(0, 1)
        ?.text()
        ?.replace(/[^.0-9]/g, '') || '0',
    ),
    yearly: parseFloat(
      $('.priceAmount')
        .slice(1, 2)
        ?.text()
        ?.replace(/[^.0-9]/g, '') || '0',
    ),
    beforeYearly: parseFloat(
      $('.oldPriceAmount')
        .slice(1, 2)
        ?.text()
        ?.replace(/[^.0-9]/g, '') || '0',
    ),
  };

  const yearlyDiscount = parseFloat(
    $('.yearlyDiscount')
      .slice(1, 2)
      ?.text()
      .replace(/[^.0-9]/g, '') || '0',
  );

  const priceDiscount = parseFloat(
    $('.priceDiscount')
      .slice(1, 2)
      ?.text()
      .replace(/[^.0-9]/g, '') || '0',
  );

  return {
    starter,
    master,
    individual,
    yearlyDiscount,
    priceDiscount,
  };
};
