import styled from "styled-components";
type TIsMobile = { $isMobile: boolean };

type THeight = { $height: number };

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  margin-top:20px;
  justify-content: center;
  align-items: center;
`;
export const Container = styled.div<THeight>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  overflow: hidden;
  position: relative;
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: calc(100% + 100px);
  border: none;
  position: absolute;
  top: -100px;
`;

