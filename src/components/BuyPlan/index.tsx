import { useMediaQuery } from '@mui/material';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';

import { CheckCircleIcon } from '~assets/icons/premium/CheckCircle';
import Button from '~components/buttons/Button/Button';
import { LabelSize } from '~components/Label/types';
import { Modal } from '~components/Modal';

import { Price } from './Price';
import {
  ButtonWrapper,
  Container,
  DescriptionText,
  DescriptionWrapper,
  PlanName,
  PriceBeforeText,
  StyledLabel,
  StyledOffLabel,
  Wrapper,
} from './styles';
import { BuyPlanType, PricePeriod } from './types';
import { getBuildEnvVar } from '~utils/env';
import { useAuth } from '~hooks/auth';
import { useMixpanel } from 'react-mixpanel-browser';
import { PATHS } from '~constants/paths';
import { useNavigate } from 'react-router-dom';

type TProps = {
  email: string;
  pid: string;
  wid: string;
  caption: string;
  planId: string;
  planName: string;
  priceBeforeMonth?: string;
  priceBeforeYear?: string;
  priceMonth: string;
  priceYear: string;
  pricePeriod?: PricePeriod;
  oldPricePeriod?: PricePeriod;
  offLabel: string;
  discount: number;
  type?: BuyPlanType;
  width?: number | '100%';
  isActive?: boolean;
  label?: string;
  featuresDescription?: string;
  mixpanelValue: string;
};

export const BuyPlan = ({
  email,
  pid,
  wid,
  caption,
  planId,
  planName,
  width = '100%',
  isActive = false,
  label,
  offLabel,
  discount,
  featuresDescription,
  priceBeforeMonth,
  priceBeforeYear,
  priceMonth,
  mixpanelValue,
  priceYear,
  type = BuyPlanType.full,
  pricePeriod = PricePeriod.month,
  oldPricePeriod = PricePeriod.month,
}: TProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const [isOpen, setOpen] = useState(false);
  const { isPremium } = useAuth()
  const mixpanel = useMixpanel()
  const navigate = useNavigate();

  const handleOnClick = () => {
    mixpanel.track(mixpanelValue)
    setOpen(true);
  };

  const handleOnClose = () => {
    setOpen(false);
    navigate(`/${PATHS.MAIN}?premium=1`, { relative: 'path' });
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleOnClose}
        width={400}
        height={600}
        padding={'0'}
        margin={isMobile ? '0' : undefined}
      >
        <iframe
          id='cb-frame'
          style={{
            width: '100%',
            height: '100%',
            visibility: 'visible',
            position: 'absolute',
            border: 0,
            display: 'block',
          }}
          src={`${getBuildEnvVar('DEV_STRIPE')}/hosted_pages/plans/${planId}_${pricePeriod === PricePeriod.month ? 'monthly' : 'yearly'
            }?customer[cf_pid]=${pid}&subscription[cf_wid]=${wid}&customer[email]=${email}&${discount ? `coupon_ids[0]=${discount}_DISCOUNT` : ''}&subscription[cf_template]=urlWithTabs&subscription[cf_plan_name]=${planName.toUpperCase()
            }&subscription[cf_app_name]=${caption}&subscription[cf_plan_type]=account_plan&subscription[cf_ag_plan_id]=${planId
            }&hp_opener=chargebee&hp_referrer=https://appsgeyser.com&layout=in_app`}
          title='Checkout Page'
        ></iframe>
      </Modal>
      <Container width={width} $isActive={isActive}>
        {label && (
          <StyledLabel size={LabelSize.small} width={135} color='violet' typographyVariant='xs-600'>
            {label}
          </StyledLabel>
        )}

        {offLabel && type === BuyPlanType.full && (
          <StyledOffLabel
            size={LabelSize.small}
            color='supportiveDodoria10'
            typographyVariant='xs-600'
            type={type}
          >
            {offLabel}
          </StyledOffLabel>
        )}

        {type === BuyPlanType.short && (!!priceBeforeMonth || !!priceBeforeYear) && (
          <PriceBeforeText
            color={isActive ? 'lightViolet' : 'monochromeGray'}
            type={type}
            $isActive={isActive}
          >{`${oldPricePeriod === PricePeriod.month ? priceBeforeMonth : priceBeforeYear
            }/${oldPricePeriod}`}</PriceBeforeText>
        )}

        <Wrapper type={type}>
          <PlanName $isActive={isActive} type={type}>
            {planName}
          </PlanName>
          {type === BuyPlanType.short && (
            <Price
              value={pricePeriod === PricePeriod.month ? priceMonth : priceYear}
              type={type}
              pricePeriod={oldPricePeriod}
              isActive={isActive}
            />
          )}
        </Wrapper>

        {featuresDescription && (
          <DescriptionWrapper $isActive={isActive}>
            <CheckCircleIcon />
            <DescriptionText color={isActive ? 'lightViolet' : 'monochromeGray'}>
              {featuresDescription}
            </DescriptionText>
          </DescriptionWrapper>
        )}

        {type === BuyPlanType.full && (!!priceBeforeMonth || !!priceBeforeYear) && (
          <PriceBeforeText
            color={isActive ? 'lightViolet' : 'monochromeGray'}
            type={type}
            $isActive={isActive}
          >{`${oldPricePeriod === PricePeriod.month ? priceBeforeMonth : priceBeforeYear
            }/${oldPricePeriod}`}</PriceBeforeText>
        )}

        {type === BuyPlanType.full && (
          <Price
            value={pricePeriod === PricePeriod.month ? priceMonth : priceYear}
            type={type}
            pricePeriod={oldPricePeriod}
            isActive={isActive}
          />
        )}

        <ButtonWrapper type={type}>
          <Button
            width='100%'
            backgroundColor={isActive ? 'banana' : undefined}
            variant={isActive ? 'tertiary' : 'primary'}
            onClick={handleOnClick}
            disabled={isPremium}
          >
            Subscribe
          </Button>
          {offLabel && type === BuyPlanType.short && (
            <StyledOffLabel
              size={LabelSize.small}
              color='supportiveDodoria10'
              typographyVariant='xxs-600'
              type={type}
            >
              {offLabel}
            </StyledOffLabel>
          )}
        </ButtonWrapper>
      </Container>
    </>
  );
};
