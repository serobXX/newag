import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { AppIcon } from '~components/AppIcon/AppIcon';
import Button from '~components/buttons/Button/Button';
import { Typography } from '~components/index';
import { LabelSize } from '~components/Label/types';
import { Modal, TProps } from '~components/Modal';
import { useAppList } from '~hooks/api/dashboard';
import { useCreateApp } from '~hooks/create-app';

import { AppIconWrapper, ButtonLabel, ButtonsWrapper, FormText, Header } from './styles';
import { useMixpanel } from 'react-mixpanel-browser';
import { BuyPremiumModal } from '../BuyPremiumModal';
import { useAuth } from '~hooks/auth';
import { useTour } from '@reactour/tour';
import { loadStripe } from '@stripe/stripe-js';
import { getBuildEnvVar } from '~utils/env';

export const DownloadModal = ({
  width = 608,
  height,
  actionsSlotContent,
  open,
  onClose,
  ...rest
}: TProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { appIcon, appName } = useCreateApp();
  const appListQuery = useAppList();
  const [downloadName, setDownloadName] = useState('');
  const theme = useTheme();
  const mixpanel = useMixpanel()
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const widgetId = location.state?.widgetId as string;
  const isLoading = appListQuery.isLoading;
  const stripePromise = loadStripe(getBuildEnvVar('STRIPE_PUBLIC'));

  const handleButtonClick = () => {
    onClose?.({}, 'backdropClick');
  };
  const { setIsOpen, setCurrentStep } = useTour()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isPremium,
    premium: { data, email },
  } = useAuth();

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentStep(0)
  };
  const getIos = async () => {
    if (!isPremium) {
      setIsOpen(false)
      setIsModalOpen(true)
    } else {
      const stripe = await stripePromise
      const planId = 'price_1MoORmFajHDo1i8pSHyYYwGh'
      // @ts-ignore
      stripe.redirectToCheckout({
        lineItems: [{ price: planId, quantity: 1 }],
        mode: 'payment',
        customerEmail: email,
        successUrl: `https://stage.appsgeyser.com/dashboard?download=1`,
        cancelUrl: 'https://stage.appsgeyser.com/dashboard'
      })
    }
  }
  useEffect(() => {
    if (open) {
      appListQuery.mutateAsync().then((response) => {
        const name = response?.widgetsArray?.find((value) =>
          widgetId ? value.wid === widgetId : value.caption === appName,
        )?.name;

        if (name) {
          setDownloadName(name);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);



  return (
    <>
      <BuyPremiumModal open={isModalOpen} onClose={handleModalClose} />
      <Modal
        width={width}
        height={height}
        loading={isLoading}
        padding={isMobile ? '0 8px 16px' : undefined}
        margin={isMobile ? '0' : undefined}
        actionsSlotContent={actionsSlotContent}
        open={open}
        onClose={onClose}
        {...rest}
      >
        <Header $isMobile={isMobile}>{t('download')}</Header>

        {!isMobile && (
          <FormText variant='m-400' color='middleGrey'>
            {t('download-description')}
          </FormText>
        )}
        <AppIconWrapper>
          <AppIcon
            icon={appIcon ? <img src={appIcon} width={56} height={56} /> : null}
            text={appName}
          />
        </AppIconWrapper>
        <Typography>{t('test-your-app')}</Typography>
        <FormText variant='m-400' color='middleGrey'>
          {t('test-your-app-description')}
        </FormText>
        <ButtonsWrapper>
          <div />
          <a
            id='download-apk-link'
            target='_blank'
            href={`https://appsgeyser.com/building/?type=apk&widget_name=${downloadName}`}
            rel='noreferrer'
            onClick={handleButtonClick}
            style={{ textDecoration: 'none', width: isMobile ? '100%' : 'unset' }}
          >
            <Button className='step1' onClick={() => { mixpanel.track('DownloadClickAPK') }} variant='secondary' width={isMobile ? '100%' : 235}>
              {t('download')} apk
            </Button>
          </a>
        </ButtonsWrapper>
        <Typography>{t('publish-in-store')}</Typography>
        <FormText variant='m-400' color='middleGrey'>
          {t('publish-in-store-description')}
        </FormText>
        <ButtonsWrapper $isMobile={isMobile}>
          <a
            id='download-apk-link'
            target='_blank'
            href={`https://files.appsgeyser.com/${downloadName}.aab?src=page`}
            rel='noreferrer'
            onClick={handleButtonClick}
            style={{ textDecoration: 'none', width: isMobile ? '100%' : 'none' }}
          >
            <Button className='step2' onClick={() => { mixpanel.track('DownloadClickAAB') }} variant='secondary' width={isMobile ? '100%' : 235}>
              {t('download')} AAB
            </Button>
          </a>

          <Button
            onClick={getIos}
            className='step3'
            variant='secondary'
            width={isMobile ? '100%' : 235}
            rightContent={
              !isPremium &&
              <ButtonLabel
                size={LabelSize.small}
                color='banana'
                typographyVariant='xxs-500'
                typographyColor='darkLabelText'
              >
                {t('premium')}
              </ButtonLabel>
            }
          >

            {t('download')} iOS
          </Button>
        </ButtonsWrapper>
        {/* <ButtonsWrapper>
        <div />
        <Button
          width={isMobile ? '100%' : 235}
          rightContent={
            <ButtonLabel
              size={LabelSize.small}
              color='banana'
              typographyVariant='xxs-500'
              typographyColor='darkLabelText'
            >
              {t('premium')}
            </ButtonLabel>
          }
        >
          {t('download')} all
        </Button>
      </ButtonsWrapper> */}
      </Modal>
    </>
  );
};
