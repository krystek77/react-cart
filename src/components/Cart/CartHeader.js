import React from "react";
import styled from "styled-components";
import { ThemeContextConsumer } from "../../context/theme";

export default function CartHeader() {
  return (
    <ThemeContextConsumer>
      {(theme) => {
        return (
          <CartHeaderWrapper className="d-none d-lg-block" value={theme}>
            <div className="header row">
              <div className="field col-10 mx-auto col-lg-2">
                <span className="name">Fruit/Vegetable</span>
              </div>
              <div className="field col-10 mx-auto col-lg-2">
                <span className="name">Name of fruit/vegetable</span>
              </div>
              <div className="field col-10 mx-auto col-lg-2">
                <span className="name">Price</span>
              </div>
              <div className="field col-10 mx-auto col-lg-2">
                <span className="name">Quantity</span>
              </div>
              <div className="field col-10 mx-auto col-lg-2">
                <span className="name">Remove</span>
              </div>
              <div className="field col-10 mx-auto col-lg-2">
                <span className="name">Total</span>
              </div>
            </div>
          </CartHeaderWrapper>
        );
      }}
    </ThemeContextConsumer>
  );
}
const CartHeaderWrapper = styled.div`
  .header {
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    border: 1px solid ${(props) => props.value.theme.secondary.dark};
    background-color: ${(props) => props.value.theme.secondary.main};
  }
  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    border-right: 1px solid ${(props) => props.value.theme.dark};
  }
  .field:last-child {
    border-right: initial;
  }
  .name {
    font-size: 1rem;
    text-align: center;
    text-transform: capitalize;
    color: ${(props) => props.value.theme.secondary.text};
  }
`;
