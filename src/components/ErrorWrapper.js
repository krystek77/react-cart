import React from "react";
import styled from "styled-components";
import { ThemeContextConsumer } from "../context/theme";

export const Error = (props) => {
  return (
    <ThemeContextConsumer>
      {(theme) => {
        return (
          <ErrorWrapper value={theme}>
            <h2>Error occurs</h2>
            <p>{props.error.message}</p>
          </ErrorWrapper>
        );
      }}
    </ThemeContextConsumer>
  );
};

const ErrorWrapper = styled.div`
  margin: auto;
  border: 1px solid ${(props) => props.value.theme.primary.dark};
  border-radius: 0.4rem;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 1);
  h2 {
    font-size: 1.4rem;
    font-family: "Open Sans", sans-serif;
    text-transform: capitalize;
    margin: 0;
    padding: 0.5rem 1rem;
    background-color: ${(props) => props.value.theme.primary.main};
    color: ${(props) => props.value.theme.primary.text};
  }
  p {
    font-size: 1.6rem;
    margin: 0;
    font-weight: 300;
    padding: 3rem 1rem;
    background-color: ${(props) => props.value.theme.secondary.main};
    color: ${(props) => props.value.theme.secondary.text};
  }
`;
