import styled from 'styled-components';
import { css } from 'styled-components';

import { Typography } from '~components/index';

type TProps = { $isTabletXl: boolean };

type TIsMobile = { $isMobile: boolean };

export const Container = styled.div<TProps>`
  display: flex;
  flex-direction: ${({ $isTabletXl }) => ($isTabletXl ? 'column-reverse' : 'column')};
`;

export const PlansWrapper = styled.div<TProps & TIsMobile>`
  display: flex;
  flex-direction: ${({ $isTabletXl }) => ($isTabletXl ? 'column' : 'row')};
  gap: ${({ $isTabletXl }) => ($isTabletXl ? 0 : 8)}px;
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      padding: 0 8px;
    `};
`;

export const DescriptionsWrapper = styled.div<TIsMobile>`
  display: flex;
  padding: ${({ $isMobile }) => ($isMobile ? '12px 0' : '12px 8px')};
`;

export const StyledText = styled(Typography)`
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 22px;
  font-weight: 700;
  line-height: 24px;
  padding: 16px 16px 0;
`;
