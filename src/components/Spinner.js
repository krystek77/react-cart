import React from "react";
import { ThemeContextConsumer } from "../context/theme";
import styled from "styled-components";

export default function Spinner(props) {
  let spinner = props.isLoading ? (
    <ThemeContextConsumer>
      {(theme) => <SpinnerWrapper value={theme}>loading...</SpinnerWrapper>}
    </ThemeContextConsumer>
  ) : null;
  return spinner;
}

const SpinnerWrapper = styled.p`
  position: absolute;
  top: 1rem;
  left: 50%;
  font-size: 1rem;
  color: ${(props) => props.value.theme.secondary.dark};
  transform: translateX(-50%);
`;
