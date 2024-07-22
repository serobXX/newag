import { DialogProps, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useTheme } from 'styled-components';

import { PricePeriod } from '~components/BuyPlan/types';
import { Modal } from '~components/Modal';

import { BuyPremiumContent } from './BuyPremiumContent';
import { BuyPremiumFooter } from './BuyPremiumFooter';
import { BuyPremiumHeader } from './BuyPremiumHeader';

export const BuyPremiumModal = ({ open, onClose }: Pick<DialogProps, 'open' | 'onClose'>) => {
  const [pricePeriod, setPricePeriod] = useState<PricePeriod>(PricePeriod.month);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);

  return (
    <Modal
      open={open}
      onClose={onClose}
      width={1020}
      titleSlotContent={<BuyPremiumHeader onPeriodChange={setPricePeriod} />}
      actionsSlotContent={<BuyPremiumFooter />}
      padding={isMobile ? '0 8px 16px' : undefined}
      margin={isMobile ? '0' : undefined}
    >
      <BuyPremiumContent pricePeriod={pricePeriod} />
    </Modal>
  );
};
