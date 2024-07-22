import { Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, Location, useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { PATHS } from '~constants/paths';
import { Colors } from '~types/colors';

import { TPathsValues } from '../../routes/types';
import { Container, StyledBreadcrumbsComponent, Wrapper } from './styles';

type TProps = { bgColor?: Colors; width?: number };

export const getLocationPathnames = (location: Location): TPathsValues[] => {
  const basePath = !location.pathname.includes(PATHS.MAIN) ? `/${PATHS.MAIN}` : '';
  return `${basePath}${location.pathname}`.split('/').filter((x) => x) as TPathsValues[];
};

const shouldHideBreadcrumbs = (
  location: Location,
  pathnames: TPathsValues[],
  widgetId: string | undefined,
): boolean => {
  return pathnames.length < 2 || (location.pathname.includes(PATHS.CREATE_APP) && !widgetId);
};

const generatePath = (paths: TPathsValues[], pathname: string, index: number): string => {
  const fromIndex = !pathname.includes(PATHS.MAIN) ? 1 : 0;
  return `/${paths.slice(fromIndex, index + 1).join('/')}`;
};

export const Breadcrumbs = ({ bgColor, width = 832 }: TProps) => {
  const theme = useTheme();
  const location = useLocation();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);

  const widgetId = location.state?.widgetId as string;
  const pathnames = getLocationPathnames(location);

  if (shouldHideBreadcrumbs(location, pathnames, widgetId)) {
    return null;
  }

  return (
    <Wrapper>
      <Container $bgColor={!isMobile ? 'transparent' : bgColor} $width={width}>
        <StyledBreadcrumbsComponent aria-label='Breadcrumb'>
          {pathnames.map((value, index, paths) => {
            const last = index === paths.length - 1;
            const to = generatePath(paths, location.pathname, index);

            return last ? (
              <Typography key={to}>{t(value)}</Typography>
            ) : (
              <RouterLink color='inherit' to={to} key={to} state={{ widgetId }}>
                {t(value)}
              </RouterLink>
            );
          })}
        </StyledBreadcrumbsComponent>
      </Container>
    </Wrapper>
  );
};
