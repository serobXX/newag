import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { BuyPlan } from '~components/BuyPlan';
import { BuyPlanType, PricePeriod } from '~components/BuyPlan/types';
import { BuyPlanDescription } from '~components/BuyPlanDescription';
import { useAuth } from '~hooks/auth';
import { useDashboard } from '~hooks/dashboard';

import { PlanDescriptions, PlanDescriptionsMobile } from '../constants';
import { Container, DescriptionsWrapper, PlansWrapper, StyledText } from './styles';
import { useEffect } from 'react';
import { useMixpanel } from 'react-mixpanel-browser';

type TProps = { pricePeriod: PricePeriod };

export const BuyPremiumContent = ({ pricePeriod }: TProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    premium: { pid, data, email },
  } = useAuth();
  const { appList } = useDashboard();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const isTabletXl = useMediaQuery(theme.breakpoints['--tablet-xl']);
  const mixpanel = useMixpanel()
  useEffect(() => {
    mixpanel.track('PrScreenShow')
    return () => mixpanel.track('PrScreenClose');
  }, [])

  return (
    <Container $isTabletXl={isTabletXl}>
      <PlansWrapper $isTabletXl={isTabletXl} $isMobile={isMobile}>
        <BuyPlan
          isActive
          email={email}
          pid={pid}
          wid={appList?.[0]?.wid || ''}
          caption={appList?.[0]?.caption || ''}
          planId={data.master.planId}
          planName='Master'
          mixpanelValue='PrTarif1Click'
          priceBeforeYear=''
          priceBeforeMonth={
            !!data.starter.beforeMonthly || !!data.starter.beforeYearly
              ? pricePeriod == PricePeriod.month
                ? `$${data.master.beforeMonthly.toLocaleString('ru-RU')}`
                : `$${data.master.beforeYearly.toLocaleString('ru-RU')}`
              : ''
          }
          priceMonth={`$${data.master.monthly.toLocaleString('ru-RU')}`}
          priceYear={`$${data.master.yearly.toLocaleString('ru-RU')}`}
          label='Best value'
          offLabel={data.priceDiscount ? `${data.priceDiscount}% off` : ''}
          discount={data.priceDiscount && data.priceDiscount}
          featuresDescription='All 12 features'
          pricePeriod={pricePeriod}
        />
        <BuyPlan
          email={email}
          pid={pid}
          wid={appList?.[0]?.wid || ''}
          caption={appList?.[0]?.caption || ''}
          planId={data.individual.planId}
          planName='Individual'
          mixpanelValue='PrTarif1Click'
          priceBeforeYear=''
          priceBeforeMonth={
            !!data.starter.beforeMonthly || !!data.starter.beforeYearly
              ? pricePeriod == PricePeriod.month
                ? `$${data.individual.beforeMonthly.toLocaleString('ru-RU')}`
                : `$${data.individual.beforeYearly.toLocaleString('ru-RU')}`
              : ''
          }
          priceMonth={`$${data.individual.monthly.toLocaleString('ru-RU')}`}
          priceYear={`$${data.individual.yearly.toLocaleString('ru-RU')}`}
          offLabel={data.priceDiscount ? `${data.priceDiscount}% off` : ''}
          discount={data.priceDiscount && data.priceDiscount}
          featuresDescription='9 main features'
          pricePeriod={pricePeriod}
        />
        <BuyPlan
          email={email}
          pid={pid}
          wid={appList?.[0]?.wid || ''}
          caption={appList?.[0]?.caption || ''}
          planId={data.starter.planId}
          planName='Starter'
          mixpanelValue='PrTarif3Click'

          priceBeforeYear=''
          priceBeforeMonth={
            !!data.starter.beforeMonthly || !!data.starter.beforeYearly
              ? pricePeriod == PricePeriod.month
                ? `$${data.starter.beforeMonthly.toLocaleString('ru-RU')}`
                : `$${data.starter.beforeYearly.toLocaleString('ru-RU')}`
              : ''
          }
          priceMonth={`$${data.starter.monthly.toLocaleString('ru-RU')}`}
          priceYear={`$${data.starter.yearly.toLocaleString('ru-RU')}`}
          offLabel={data.priceDiscount ? `${data.priceDiscount}% off` : ''}
          discount={data.priceDiscount && data.priceDiscount}
          featuresDescription='5 basic features'
          pricePeriod={pricePeriod}
        />
      </PlansWrapper>

      <DescriptionsWrapper $isMobile={isMobile}>
        <BuyPlanDescription
          activeColumnIndex={0}
          planList={isMobile ? PlanDescriptionsMobile : PlanDescriptions}
          isMobile={isMobile}
        />
      </DescriptionsWrapper>

      {isMobile && <StyledText>{t('compare-plans')}</StyledText>}

      <PlansWrapper $isTabletXl={isTabletXl} $isMobile={isMobile}>
        <BuyPlan
          isActive
          email={email}
          pid={pid}
          wid={appList?.[0]?.wid || ''}
          caption={appList?.[0]?.caption || ''}
          planId={data.master.planId}
          planName='Master'
          mixpanelValue='PrTarif1Click'
          priceBeforeYear=''
          priceBeforeMonth={
            !!data.starter.beforeMonthly || !!data.starter.beforeYearly
              ? pricePeriod == PricePeriod.month
                ? `$${data.master.beforeMonthly.toLocaleString('ru-RU')}`
                : `$${data.master.beforeYearly.toLocaleString('ru-RU')}`
              : ''
          }
          priceMonth={`$${data.master.monthly.toLocaleString('ru-RU')}`}
          priceYear={`$${data.master.yearly.toLocaleString('ru-RU')}`}
          label='Best value'
          offLabel={data.priceDiscount ? `${data.priceDiscount}% off` : ''}
          discount={data.priceDiscount && data.priceDiscount}
          type={BuyPlanType.short}
          pricePeriod={pricePeriod}
        />
        <BuyPlan
          email={email}
          pid={pid}
          wid={appList?.[0]?.wid || ''}
          caption={appList?.[0]?.caption || ''}
          planName='Individual'
          mixpanelValue='PrTarif2Click'
          planId={data.individual.planId}
          priceBeforeYear=''
          priceBeforeMonth={
            !!data.starter.beforeMonthly || !!data.starter.beforeYearly
              ? pricePeriod == PricePeriod.month
                ? `$${data.individual.beforeMonthly.toLocaleString('ru-RU')}`
                : `$${data.individual.beforeYearly.toLocaleString('ru-RU')}`
              : ''
          }
          priceMonth={`$${data.individual.monthly.toLocaleString('ru-RU')}`}
          priceYear={`$${data.individual.yearly.toLocaleString('ru-RU')}`}
          offLabel={data.priceDiscount ? `${data.priceDiscount}% off` : ''}
          discount={data.priceDiscount && data.priceDiscount}
          type={BuyPlanType.short}
          pricePeriod={pricePeriod}
        />
        <BuyPlan
          email={email}
          pid={pid}
          wid={appList?.[0]?.wid || ''}
          caption={appList?.[0]?.caption || ''}
          planId={data.starter.planId}
          planName='Starter'
          mixpanelValue='PrTarif3Click'
          priceBeforeYear=''
          priceBeforeMonth={
            !!data.starter.beforeMonthly || !!data.starter.beforeYearly
              ? pricePeriod == PricePeriod.month
                ? `$${data.starter.beforeMonthly.toLocaleString('ru-RU')}`
                : `$${data.starter.beforeYearly.toLocaleString('ru-RU')}`
              : ''
          }
          priceMonth={`$${data.starter.monthly.toLocaleString('ru-RU')}`}
          priceYear={`$${data.starter.yearly.toLocaleString('ru-RU')}`}
          offLabel={data.priceDiscount ? `${data.priceDiscount}% off` : ''}
          discount={data.priceDiscount && data.priceDiscount}
          type={BuyPlanType.short}
          pricePeriod={pricePeriod}
        />
      </PlansWrapper>
    </Container>
  );
};
