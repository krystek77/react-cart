import React from "react";
import styled from "styled-components";
import { ButtonWrapper } from "../Button";
import { ThemeContextConsumer } from "../../context/theme";

export default function CartItem(props) {
  const {
    id,
    img,
    name,
    price,
    count,
    total,
    remove,
    increase,
    decrease,
  } = props;
  return (
    <ThemeContextConsumer>
      {(theme) => {
        return (
          <CartItemWrapper value={theme}>
            <div className="row">
              <div className="field col-10 mx-auto col-lg-2">
                <div className="image-wrapper">
                  <img className="image" src={img} alt={img} />
                </div>
              </div>
              <div className="field col-10 mx-auto col-lg-2">
                <span className="value name">{name}</span>
              </div>
              <div className="field col-10 mx-auto col-lg-2">
                <span className="value">{price && price.toFixed(2)}</span>
              </div>
              <div className="field col-10 mx-auto col-lg-2">
                <div>
                  <ButtonWrapper
                    cart
                    value={theme}
                    onClick={() => decrease(id)}
                  >
                    <i className="fas fa-minus"></i>
                  </ButtonWrapper>
                  <span className="value count">{count}</span>
                  <ButtonWrapper
                    cart
                    value={theme}
                    onClick={() => increase(id)}
                  >
                    <i className="fas fa-plus"></i>
                  </ButtonWrapper>
                </div>
              </div>
              <div className="field col-10 mx-auto col-lg-2">
                <span className="remove-btn" onClick={() => remove(id)}>
                  <i className="fas fa-trash-alt"></i>
                </span>
              </div>
              <div className="field col-10 mx-auto col-lg-2">
                <span className="value">
                  <strong>{total && total.toFixed(2)}</strong>
                </span>
              </div>
            </div>
          </CartItemWrapper>
        );
      }}
    </ThemeContextConsumer>
  );
}

const CartItemWrapper = styled.div`
  .field {
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 992px) {
      border-right: 1px solid ${(props) => props.value.theme.secondary.dark};
      border-bottom: 1px solid ${(props) => props.value.theme.secondary.dark};
    }
    font-size: 1.3rem;
  }
  .field:first-child {
    @media (min-width: 992px) {
      border-left: 1px solid ${(props) => props.value.theme.secondary.dark};
    }
  }
  .image-wrapper {
    width: 80px;
  }
  .value {
    text-align: center;
  }
  .value.name {
    font-family: "Open Sans", sans-serif;
  }
  .value.count {
    min-width: 50px;
    display: inline-block;
  }
  .remove-btn {
    color: ${(props) => props.value.theme.primary.main};
    transition: color 0.3s ease-in-out;
    cursor: pointer;
  }
  .remove-btn:hover {
    color: ${(props) => props.value.theme.primary.dark};
  }
`;
