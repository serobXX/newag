import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { AppIcon } from '~components/AppIcon/AppIcon';
import { Block } from '~components/Block/Block';
import { MenuItem } from '~components/MenuItem/MenuItem';
import { ProgressBar } from '~components/ProgressBar/ProgressBar';
import { PATHS } from '~constants/paths';
import { useCreateApp } from '~hooks/create-app';

import { TPathsValues } from '../../../routes/types';
import { editmenuItems, menuItems, Pages } from './constants';
import { BlockWrapper, ContentWrapper, IconWrapper, ProgressWrapper } from './styles';

export const BuildAppLayout = ({
  children,
  progressBarValue,
  currentScreen,
  step,
}: {
  children: React.ReactNode;
  progressBarValue: number;
  currentScreen: Pages;
  step: number;
}) => {
  const theme = useTheme();
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { appIcon, appName } = useCreateApp();

  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);

  const widgetId = location.state?.widgetId as string;
  const isEdit = location.pathname.includes(PATHS.YOUR_APPS);

  const handleNavigate = (route: string) => () => {
    navigate(`${isEdit ? `/${PATHS.YOUR_APPS}` : ''}${route}`, {
      relative: 'path',
      state: {
        widgetId,
      },
    });
  };

  useEffect(() => {
    if (!widgetId && isEdit) {
      navigate(`/${PATHS.YOUR_APPS}`, { relative: 'path', state: {} });
    }
  }, [isEdit, navigate, widgetId]);

  return (
    <BlockWrapper>
      {!isMobile && !widgetId && (
        <ProgressWrapper>
          <ProgressBar value={progressBarValue} />
        </ProgressWrapper>
      )}
      <Block
        isRoundCorners={!isMobile}
        leftContent={
          !isMobile && (
            <>
              <IconWrapper>
                <AppIcon
                  icon={appIcon ? <img src={appIcon} width={56} height={56} /> : null}
                  text={appName}
                />
              </IconWrapper>
              {
                isEdit ?
                  editmenuItems(widgetId ? PATHS.EDIT : PATHS.CREATE_APP).map(({ id, name, route }) => (
                    <MenuItem
                      key={id}
                      onClick={handleNavigate(route)}
                      isActive={!widgetId && currentScreen === name}
                      isCompleted={!widgetId && step > id}
                      disabled={!widgetId && step < id && currentScreen !== name}
                    >
                      {t(name as TPathsValues)}
                    </MenuItem>
                  ))
                  :
                  menuItems(widgetId ? PATHS.EDIT : PATHS.CREATE_APP).map(({ id, name, route }) => (
                    <MenuItem
                      key={id}
                      onClick={handleNavigate(route)}
                      isActive={!widgetId && currentScreen === name}
                      isCompleted={!widgetId && step > id}
                      disabled={!widgetId && step < id && currentScreen !== name}
                    >
                      {t(name as TPathsValues)}
                    </MenuItem>
                  ))
              }
            </>
          )
        }
      >
        <ContentWrapper $isMobile={isMobile}>{children}</ContentWrapper>
      </Block>
    </BlockWrapper>
  );
};
