import Button from '~components/buttons/Button/Button';
import styled from "styled-components";
import { Typography } from '~components/index';

type TIsMobile = { $isMobile: boolean };
type THeight = { $height: number };
type TMobileProps = { $isMobile: boolean };
type TIsTabletM = { $isTabletM: boolean };

export const Wrapper = styled.iframe<THeight>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  border: none;
`;


export const Container = styled.div`
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
overflow:hidden;
`
export const WarningContainer = styled.div<TIsMobile>`
background-color: #ffffff;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adjust shadow as needed */
border-radius: 10px; /* Adjust border radius as needed */
padding: 30px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:50%
font-size: ${({ $isMobile }) => ($isMobile ? 15 : 24)}px;
font-weight: ${({ $isMobile }) => ($isMobile ? 500 : 700)};
`
export const ButtonComponent = styled(Button)`
  padding: 4px 12px;
  margin: 0 9px;
`;


export const Main = styled.div<TMobileProps>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: ${({ $isMobile }) => ($isMobile ? 0 : 12)}px;
`;

export const BlockWrapper = styled.div<TMobileProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? 0 : 12)}px;
  width: 100%;
  max-width: 832px;
  padding: ${({ $isMobile }) => ($isMobile ? 0 : '10px')};
`;
export const ControlsWrapper = styled.div<TIsTabletM & TMobileProps>`
  display: flex;
  flex-direction: ${({ $isTabletM }) => ($isTabletM ? 'column' : 'row')};
  justify-content: flex-end;
  gap: 18px;
  padding: ${({ $isMobile }) => ($isMobile ? '10px 0' : '10px 16px')};
`;
export const PublishTextWrapper = styled.div`
  border-radius:10px;
  background:#F6F8F9;
  padding-top: 16px;
`;
export const Text = styled(Typography)`
  border-radius:10px;
  background:#F6F8F9;
  padding:13px;
  color: ${({ theme }) => theme.colors.middleGrey};
  line-height: 20px;
`;
export const VideoWrapper = styled.div<TMobileProps>`
  margin-top:20px;
  display: flex;
  justify-content: center;
  gap: ${({ $isMobile }) => ($isMobile ? 0 : 12)}px;
  width: 100%;
  border-radius:10px;
  overflow:hidden;
`;
