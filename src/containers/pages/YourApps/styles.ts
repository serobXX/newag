import styled from 'styled-components';

type TMobileProps = { $isMobile: boolean };

type TBannersWrapperProps = { $isTabletM: boolean };

export const Container = styled.div<TMobileProps>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: ${({ $isMobile }) => ($isMobile ? 0 : 18)}px;
`;

export const BlockWrapper = styled.div<TMobileProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? 0 : 22)}px;
  width: 100%;
  max-width: 832px;
  padding: ${({ $isMobile }) => ($isMobile ? 0 : '10px')};
`;

export const ContentWrapper = styled.div<TMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? 0 : 12)}px;
`;

export const ButtonWrapper = styled.div`
  padding: 10px 16px;
`;

export const BannersWrapper = styled.div<TBannersWrapperProps>`
  display: flex;
  flex-direction: ${({ $isTabletM }) => ($isTabletM ? 'column' : 'row')};
  gap: ${({ $isTabletM }) => ($isTabletM ? 0 : 30)}px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CircularProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;
