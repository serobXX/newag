import { useMediaQuery } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { PricePeriod } from '~components/BuyPlan/types';
import { LabelSize } from '~components/Label/types';
import { TextSwitch } from '~components/TextSwitch';

import { Container, Header, StyledLabel, SwitchWrapper } from './styles';
import { useMixpanel } from 'react-mixpanel-browser';

type TProps = { onPeriodChange: Dispatch<SetStateAction<PricePeriod>> };

export const BuyPremiumHeader = ({ onPeriodChange }: TProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const isTabletM = useMediaQuery(theme.breakpoints['--tablet-xl']);
  const mixpanel = useMixpanel()
  const handlePeriodChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      mixpanel.track('PrYearClick')
      onPeriodChange(PricePeriod.yearly);
    }
    if (!checked) {
      mixpanel.track('PrMonthClick')
      onPeriodChange(PricePeriod.month);
    }
  };

  return (
    <Container $isTabletM={isTabletM}>
      <Header $isMobile={isMobile}>{t('buy-premium')}</Header>
      <SwitchWrapper>
        {isMobile && (
          <StyledLabel
            size={LabelSize.small}
            color='supportiveDodoria10'
            typographyVariant={'xxxs-600'}
          >
            {t('save-more')}
          </StyledLabel>
        )}
        <TextSwitch textChecked='Monthly' textUnchecked='Yearly' onChange={handlePeriodChange} />
      </SwitchWrapper>
    </Container>
  );
};
