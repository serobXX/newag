import { Divider, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { DownArrowIcon } from '~assets/icons/button/DownArrow';
import { MainMenuStarIcon } from '~assets/icons/button/MainMenuStar';
import { MenuBurgerIcon } from '~assets/icons/button/MenuBurger';
import { ProfileIcon } from '~assets/icons/button/Profile';
import { StarIcon } from '~assets/icons/button/Star';
import { UpArrowIcon } from '~assets/icons/button/UpArrow';
import { DropdownMenu } from '~components/DropdownMenu';
import { HeaderMenu } from '~components/HeaderMenu/HeaderMenu';
import { HeaderMenuItem } from '~components/HeaderMenu/HeaderMenuItem';
import { MainMenuItem } from '~components/MainMenuItem';
import { PATHS } from '~constants/paths';
import { useAuth } from '~hooks/auth';
import { useCreateApp } from '~hooks/create-app';
import { getBuildEnvVar } from '~utils/env';

import { privateRoutes } from '../../routes/routes';
import { BuyPremiumModal } from '../BuyPremiumModal';
import {
  ButtonComponent,
  ButtonsWrapper,
  Container,
  IconWrapper,
  Logo,
  MenuIconWrapper,
  ProfileButtonComponent,
  Wrapper,
} from './styles';
import { useTour } from '@reactour/tour';

export const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isAuth, firstVisit } = useAuth();
  const { clearValues } = useCreateApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
  const isDesktopML = useMediaQuery(theme.breakpoints['--desktop-ml']);

  const { setIsOpen, setCurrentStep, currentStep } = useTour()

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleMenuModalOpen = () => {
    if (isAuth && firstVisit && currentStep !== 4) {
      setIsOpen(true)
      currentStep == 0 && setCurrentStep(1)
    }
    setIsMenuModalOpen(true);
  };

  const handleMenuModalClose = () => {
    setIsMenuModalOpen(false);
  };

  const handleCreateApp = () => {
    clearValues();
    navigate(`/${PATHS.CREATE_APP}`, {
      relative: 'path',
    });

  };

  const handleLogin = () => {
    navigate(`/${PATHS.LOGIN}`, {
      relative: 'path',
    });
  };

  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleMoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreAnchorEl(null);
  };

  const handleRouteNavigate = (route: string, link?: string, index?: number) => () => {
    if (link) {
      window.location.assign(link);
    } else {
      navigate(`/${route}`, {
        relative: 'path',
        state: {
          from: PATHS.MAIN,
        },
      });
    }
    if (!isDesktopML && index) {
      setIsOpen(false)
      setCurrentStep(index + 1)
    }
  };

  const handleMyProfile = () => {
    navigate(PATHS.MY_PROFILE, {
      relative: 'path',
      state: {
        from: PATHS.MAIN,
      },
    });
  };

  const handleLogout = () => {
    window.location.assign(
      `${getBuildEnvVar('API_BASE_PATH')}/logout.php?retUrl=${getBuildEnvVar('BASE_PATH')}`,
    );
    sessionStorage.removeItem('isAuth')
  };

  const handleLogo = () => {
    window.location.assign('/');
  };
  useEffect(() => {
    if (!isDesktopML && currentStep == 4) {
      handleMenuModalClose()
    }
  }, [isDesktopML, currentStep])
  return (
    <>
      <BuyPremiumModal open={isModalOpen} onClose={handleModalClose} />
      <Container>
        {isDesktopML && (
          <Wrapper>
            <Logo Component='h1' onClick={handleLogo}>
              {t('logo')}
            </Logo>
            {isAuth && (
              <>
                <ButtonsWrapper>
                  {privateRoutes
                    .filter((_, index) => index < 5)
                    .map((route, index: number) => (
                      <ButtonComponent
                        className={index > 3 ? "" : `step-${index}`}
                        key={route.path}
                        variant='quaternary'
                        backgroundColor={
                          window.location.pathname.includes(route.path) ? 'lightGreen' : undefined
                        }
                        onClick={handleRouteNavigate(route.path, route.link)}
                      >
                        {t(route.path)}
                      </ButtonComponent>
                    ))}
                  <ButtonComponent
                    backgroundColor={moreAnchorEl ? 'lightGreen' : undefined}
                    variant='quaternary'
                    onClick={handleMoreMenuClick}
                    rightContent={
                      <IconWrapper>
                        {moreAnchorEl ? (
                          <UpArrowIcon color={theme.colors.darkLabelText} />
                        ) : (
                          <DownArrowIcon color={theme.colors.darkLabelText} />
                        )}
                      </IconWrapper>
                    }
                  >
                    {t('more')}
                  </ButtonComponent>
                  <HeaderMenu
                    anchorEl={moreAnchorEl}
                    open={Boolean(moreAnchorEl)}
                    onClose={handleMoreMenuClose}
                  >
                    {privateRoutes
                      .filter((_, index) => index >= 5 && index < privateRoutes.length - 1)
                      .map((route) => (
                        <HeaderMenuItem
                          key={route.path}
                          onClick={handleRouteNavigate(route.path, route.link)}
                        >
                          {t(route.path)}
                        </HeaderMenuItem>
                      ))}
                  </HeaderMenu>
                </ButtonsWrapper>
                <Divider orientation='vertical' flexItem />
              </>
            )}
            <ButtonsWrapper>
              {isAuth && (
                <ButtonComponent rightContent={<StarIcon />} onClick={handleModalOpen}>
                  {t('premium')}
                </ButtonComponent>
              )}
              <ButtonComponent variant='secondary' onClick={handleCreateApp}>
                {t('create-app')}
              </ButtonComponent>
              {isAuth ? (
                <ProfileButtonComponent
                  onClick={handleProfileMenuClick}
                  variant='quaternary'
                  leftContent={<ProfileIcon />}
                  width={32}
                />
              ) : (
                <ButtonComponent variant='secondary' onClick={handleLogin}>
                  {t('login')}
                </ButtonComponent>
              )}
              <HeaderMenu
                anchorEl={profileAnchorEl}
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileMenuClose}
              >
                <HeaderMenuItem onClick={handleMyProfile}>{t('my-profile')}</HeaderMenuItem>
                <HeaderMenuItem onClick={handleLogout}>{t('logout')}</HeaderMenuItem>
              </HeaderMenu>
            </ButtonsWrapper>
          </Wrapper>
        )}
        {!isDesktopML && (
          <Wrapper>
            <MenuIconWrapper className='step-1' onClick={handleMenuModalOpen}>
              <MenuBurgerIcon />
            </MenuIconWrapper>
            <Logo Component='h1'>{t('logo')}</Logo>
            {isAuth ? (
              <ProfileButtonComponent
                onClick={handleProfileMenuClick}
                variant='quaternary'
                leftContent={<ProfileIcon />}
                width={32}
              />
            ) : (
              <ButtonComponent variant='secondary' onClick={handleLogin}>
                {t('login')}
              </ButtonComponent>
            )}
            <HeaderMenu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileMenuClose}
            >
              <HeaderMenuItem onClick={handleMyProfile}>{t('my-profile')}</HeaderMenuItem>
              <HeaderMenuItem onClick={handleLogout}>{t('logout')}</HeaderMenuItem>
            </HeaderMenu>
          </Wrapper>
        )}
        <DropdownMenu open={isMenuModalOpen} onClose={handleMenuModalClose}>
          {isAuth && (
            <MainMenuItem
              text={t('premium')}
              color='white'
              bgColor='piccoloHover'
              rightContent={<MainMenuStarIcon />}
              onClick={handleModalOpen}
              closeModal={handleMenuModalClose}
            />
          )}
          {isAuth &&
            privateRoutes
              .filter((_, index) => index < 4)
              .map((route, index) => (
                <MainMenuItem
                  className={index > 3 ? "" : `step-${index + 1}`}
                  text={t(route.path)}
                  key={route.path}
                  bgColor={window.location.pathname.includes(route.path) ? 'lightGreen' : undefined}
                  onClick={
                    handleRouteNavigate(route.path, route.link, index)
                  }
                  closeModal={handleMenuModalClose}
                />
              ))}
          <MainMenuItem
            onClick={handleCreateApp}
            closeModal={handleMenuModalClose}
            bgColor={window.location.pathname.includes('create-app') ? 'lightGreen' : undefined}
            text={t('create-app')}
          />
          {isAuth &&
            privateRoutes
              .filter((_, index) => index >= 5 && index < privateRoutes.length - 1)
              .map((route) => (
                <MainMenuItem
                  key={route.path}
                  onClick={handleRouteNavigate(route.path, route.link)}
                  closeModal={handleMenuModalClose}
                  bgColor={window.location.pathname.includes(route.path) ? 'lightGreen' : undefined}
                  text={t(route.path)}
                />
              ))}
        </DropdownMenu>
      </Container>
    </>
  );
};
