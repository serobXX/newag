import React, { useState } from 'react'
import { Container, BannerContainer, ButtonComponent } from './styles'
import { useMediaQuery } from '@mui/material';
import { useTheme } from 'styled-components';
import BannerIcon from "../../../assets/img/banners/bannericon.svg"
import Button from '~components/buttons/Button/Button';
import { useTranslation } from 'react-i18next';
import { BuyPremiumModal } from '../../../containers/BuyPremiumModal';
export default function Banner() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation()
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <BuyPremiumModal open={isModalOpen} onClose={handleModalClose} />
      <Container>
        <BannerContainer $isMobile={isMobile}>
          <img width={50} src={BannerIcon} />
          <h2>Session blocked.</h2>
          <h2>
            Buy premium for further steps
          </h2>
          {/* {isAuth && ( */}
          <Button onClick={handleModalOpen}>
            {t('premium')}
          </Button>
          {/* )} */}
        </BannerContainer>
      </Container>
    </>

  )
}
