import { PhoneInput as PI } from 'react-international-phone';
import styled from 'styled-components';
import { css } from 'styled-components';

import { Alert } from '~components/Alert';
import { Typography } from '~components/index';

type TIsMobile = { $isMobile: boolean };

type TPadding = { padding?: string };

type TIsError = { $isError?: boolean };

export const SaveButtonWrapper = styled.div<TIsMobile & TPadding>`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  justify-content: ${({ $isMobile }) => ($isMobile ? 'center' : 'flex-end')};
  margin: ${({ $isMobile, theme }) =>
    $isMobile ? '0 0 16px' : `${theme.spaces.l} 0 ${theme.spaces.s} 0`};
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
`;

export const StyledPhoneInput = styled(PI)<TIsError>`
  display: flex;
  gap: 8px;
  width: 100%;
  height: 50px;

  & input {
    width: calc(100% - 46px);
  }

  & .react-international-phone-input {
    box-sizing: border-box;
    height: 50px;
    border-radius: 8px;
    border: ${({ $isError }) => ($isError ? '2px solid' : '1px solid')};
    border-color: ${({ $isError, theme }) =>
      $isError ? theme.colors.supportiveDodoria10 : theme.colors.beerus};
    padding: 16px 12px;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }

  & .react-international-phone-country-selector button {
    box-sizing: border-box;
    height: 50px;
    width: 70px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.beerus};
  }

  & .react-international-phone-country-selector-dropdown {
    top: 52px;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 24px;
      background: ${({ theme }) => theme.colors.lightGrey};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 24px;
      background: ${({ theme }) => theme.colors.middleGrey};
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.monochromeGray};
    }
  }
`;

export const FormText = styled(Typography)<TIsMobile>`
  padding: ${({ $isMobile, theme }) => ($isMobile ? '8px 0 15px' : `${theme.spaces.m} 0 24px 0`)};
  line-height: 20px;
`;

export const DescriptionWrapper = styled.div<TIsMobile>`
  padding: ${({ $isMobile }) => ($isMobile ? '0 0 5px 0' : '0 0 24px 0')};
`;

export const InputFieldWrapper = styled.div<TIsMobile>`
  margin: ${({ $isMobile }) => ($isMobile ? '0' : '0 0 10px 0')};
`;

export const AlertWrapper = styled(Alert)<TIsMobile>`
  margin: ${({ $isMobile, theme }) => ($isMobile ? '0 0 10px 0' : `0 0 ${theme.spaces.m} 0`)};
`;
