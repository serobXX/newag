import { ComponentProps, useEffect, useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { EyeIcon } from '~assets/icons/button/Eye';
import Button from '~components/buttons/Button/Button';
import { CircularProgress } from '~components/CircularProgress/CircularProgress';
import { TextSwitch } from '~components/TextSwitch';
import { useUrlWithTabs } from '~hooks/api/createApp';
import { useCreateApp } from '~hooks/create-app';
import { useDebounce } from '~hooks/use-debounce';

import Android from '../../assets/icons/Android.png';
import iPhone from '../../assets/icons/iPhone.png';
import { ColorPaletteButtons } from '../pages/Customization/constants';
import {
  Container,
  Phone,
  PhoneWrapper,
  PreviewButtonWrapper,
  PreviewIconWrapper,
  Switcher,
} from './styles';
import { useMixpanel } from 'react-mixpanel-browser';
import { useLocation } from 'react-router-dom';

export enum PreviewPlatform {
  IOS = 'iOS',
  ANDROID = 'Android',
}

type TProps = {
  mobileSize?: string;
  phoneWrapperSizeW?: string;
  phoneWrapperSizeH?: string;
};

export const Preview = React.memo(
  ({ mobileSize, phoneWrapperSizeW, phoneWrapperSizeH }: TProps) => {
    const theme = useTheme();
    const values = useCreateApp();
    const urlWithTabs = useUrlWithTabs();
    const { t } = useTranslation();
    const [platform, setPlatform] = useState(PreviewPlatform.IOS);
    const [active, setActive] = useState(false);
    const [isIframeLoaded, setIframeLoaded] = useState(false);
    const [html, setHtml] = useState('');
    const mixpanel = useMixpanel()
    const { pathname } = useLocation();
    const {
      url,
      whatsApp,
      facebook,
      twitter,
      youtube,
      blog,
      map,
      appLayoutView,
      actionBar,
      colorTheme,
      appIcon,
      appName,
    } = useDebounce(
      {
        url: values.url,
        whatsApp: values.whatsApp,
        facebook: values.facebook,
        twitter: values.twitter,
        youtube: values.youtube,
        blog: values.blog,
        map: values.map,
        appLayoutView: values.appLayoutView,
        actionBar: values.actionBar,
        colorTheme: values.colorTheme,
        appIcon: values.appIcon,
        appName: values.appName,
      },
      1000,
    );

    const isLoading = urlWithTabs.isLoading;

    const handleOnChange: ComponentProps<typeof TextSwitch>['onChange'] = (_, checked) => {
      if (checked) {
        setPlatform(PreviewPlatform.ANDROID);
      } else {
        setPlatform(PreviewPlatform.IOS);
      }
    };

    const handleOnActive = async () => {
      if (pathname == '/create-app/customization') {
        mixpanel.track('Cr2PreviewClick')
      } else if (pathname == '/create-app/feature') {
        mixpanel.track('Cr3PreviewClick')
      } else if (pathname == '/create-app/plugins') {
        mixpanel.track('Cr4PreviewClick')
      } else {
        mixpanel.track('Cr1PreviewClick')
      }
      setActive(true);
    };

    const handleIframeLoaded = () => {
      setIframeLoaded(true);
    };

    useEffect(() => {
      const getHtml = async () => {
        setHtml('');
        setIframeLoaded(false);

        const response = await urlWithTabs.mutateAsync({
          url,
          whatsApp,
          facebook,
          twitter,
          youtube,
          blog,
          map,
          appLayoutView,
          actionBar,
          color: ColorPaletteButtons[colorTheme.id as keyof typeof ColorPaletteButtons],
          appIcon,
          appName,
        });

        setHtml(`${response}`);
      };

      if (active) {
        getHtml();
      } else if (url) {
        setActive(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      theme,
      url,
      whatsApp,
      facebook,
      twitter,
      youtube,
      blog,
      map,
      appLayoutView,
      actionBar,
      colorTheme,
      active,
    ]);

    return (
      <Container className={pathname == '/create-app' ? "fourth-step" : ''}>
        <Switcher
          onChange={handleOnChange}
          textChecked={PreviewPlatform.IOS}
          textUnchecked={PreviewPlatform.ANDROID}
        />
        <PhoneWrapper
          $backgroundColor={
            active && !isLoading && isIframeLoaded ? 'black' : 'lightGreenBackground'
          }
          $phoneWrapperSizeW={phoneWrapperSizeW}
          $phoneWrapperSizeH={phoneWrapperSizeH}
        >
          <Phone
            $mobileSize={mobileSize}
            src={platform === PreviewPlatform.IOS ? iPhone : Android}
          />
          {active && (isLoading || !isIframeLoaded) && (
            <CircularProgress style={{ position: 'absolute' }} />
          )}
          {active ? (
            <iframe name='preview-frame' onLoad={handleIframeLoaded} srcDoc={html}></iframe>
          ) : (
            <PreviewButtonWrapper>
              <Button
                width={143}
                textVariant='s-600'
                variant='quaternary'
                rightContent={
                  <PreviewIconWrapper>
                    <EyeIcon />
                  </PreviewIconWrapper>
                }
                onClick={handleOnActive}
              >
                {t('preview')}
              </Button>
            </PreviewButtonWrapper>
          )}
        </PhoneWrapper>
      </Container >
    );
  },
);

Preview.displayName = 'Preview';
