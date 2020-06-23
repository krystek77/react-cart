import React from "react";
import { AuthContextConsumer } from "../context/auth";
import { ThemeContextConsumer } from "../context/theme";
import styled from "styled-components";

export default function Greeting() {
  return (
    <ThemeContextConsumer>
      {(theme) => {
        return (
          <AuthContextConsumer>
            {(auth) => {
              const isAuthenticated = auth.idToken !== "";

              let greeting = null;
              if (isAuthenticated) {
                greeting = (
                  <GreetingWrapper value={theme}>
                    <div className="container">
                      <div className="row">
                        <p className="greeting">
                          Hello <strong>{auth.email}</strong>
                        </p>
                      </div>
                    </div>
                  </GreetingWrapper>
                );
              }
              return greeting;
            }}
          </AuthContextConsumer>
        );
      }}
    </ThemeContextConsumer>
  );
}

const GreetingWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1.6rem;
  font-family: "Open Sans", sans-serif;

  .greeting {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    strong {
      font-family: "Oswald", sans-serif;
      color: ${(props) => props.value.theme.primary.main};
    }
  }
  .greeting:after {
    position: absolute;
    display: block;
    content: "";
    bottom: -0.5rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${(props) => props.value.theme.primary.main};
  }
`;
