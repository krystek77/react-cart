import React from "react";
import styled from "styled-components";
import { ThemeContextConsumer } from "../context/theme";

export default function Footer() {
  return (
    <ThemeContextConsumer>
      {(theme) => (
        <FooterWrapper value={theme}>
          <div className="container">
            <div className="row">
              <div className="col">
                <span className="copyright">&copy; 2020 Krystian</span>
              </div>
            </div>
          </div>
        </FooterWrapper>
      )}
    </ThemeContextConsumer>
  );
}

const FooterWrapper = styled.footer`
  background-color: ${(props) => props.value.theme.secondary.main};
  color: ${(props) => props.value.theme.secondary.text};
  border: 1px solid ${(props) => props.value.theme.secondary.dark};
  box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 1);
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  margin-top: 3rem;
  .copyright {
    font-size: 1rem;
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
    text-align: center;
    display: block;
  }
`;
