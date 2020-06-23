import React from "react";
import styled, { keyframes } from "styled-components";
import { ThemeContextConsumer } from "../context/theme";

export default function CssSpinner() {
  return (
    <ThemeContextConsumer>
      {(theme) => {
        return (
          <CssSpinnerWrapper value={theme}>
            <div className="loader"></div>
            <p className="loader-text">Loading data ...</p>
          </CssSpinnerWrapper>
        );
      }}
    </ThemeContextConsumer>
  );
}

const rotate = keyframes`
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
`;

const CssSpinnerWrapper = styled.div`
  width: 100%;
  padding: 2rem 1.5rem;
  .loader {
    position: relative;
    margin: auto;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid ${(props) => props.value.theme.primary.dark};
    background-color: ${(props) => props.value.theme.primary.main};
    transform: rotate(45deg);
    animation: ${rotate} 2s linear infinite;
  }
  .loader:before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    display: block;
    width: 100%;
    height: 28px;
    background-color: ${(props) => props.value.theme.primary.main};
  }
  .loader:after {
    position: absolute;
    left: 0;
    bottom: 0;
    content: "";
    display: block;
    width: 100%;
    height: 28px;
    background-color: ${(props) => props.value.theme.secondary.main};
  }
  .loader-text {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
  }
`;
