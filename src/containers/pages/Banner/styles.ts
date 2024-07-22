import { Button } from "@mui/material";
import styled from "styled-components";
type TIsMobile = { $isMobile: boolean };

export const Container = styled.div`
width:100%;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
overflow:hidden;
`
export const BannerContainer = styled.div<TIsMobile>`
background-color: #ffffff;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adjust shadow as needed */
border-radius: 10px; /* Adjust border radius as needed */
padding: 30px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:40%
font-size: ${({ $isMobile }) => ($isMobile ? 15 : 24)}px;
font-weight: ${({ $isMobile }) => ($isMobile ? 500 : 700)};
`
export const ButtonComponent = styled(Button)`
  padding: 4px 12px;
  margin: 0 9px;
`;