import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonWrapper } from "./Button";
import { ThemeContextConsumer } from "../context/theme";
import { ProductContextConsumer } from "../context/product";

export default function Modal() {
  return (
    <ThemeContextConsumer>
      {(theme) => {
        return (
          <ProductContextConsumer>
            {(data) => {
              let render = null;
              const { img, price, name } = data.productDetails;
              if (data.isModalOpen) {
                render = (
                  <ModalWrapper
                    value={theme}
                    onClick={() => {
                      data.closeModal();
                    }}
                  >
                    <div
                      className="modal"
                      onClick={() => {
                        data.closeModal();
                      }}
                    >
                      <h1 className="modal-title">Item added to cart</h1>
                      <div className="image-wrapper">
                        <img className="image" src={img} alt={img} />
                      </div>
                      <h2 className="name">{name}</h2>
                      <p className="price-wrapper">
                        Price:{" "}
                        <strong className="price">
                          {price && price.toFixed(2)} Euro
                        </strong>
                      </p>
                      <div className="controls">
                        <Link to="/">
                          <ButtonWrapper
                            modal
                            value={theme}
                            onClick={() => data.closeModal()}
                          >
                            Continue shopping
                          </ButtonWrapper>
                        </Link>
                        <Link to="/cart">
                          <ButtonWrapper
                            modal
                            value={theme}
                            onClick={() => data.closeModal()}
                          >
                            Go to cart
                          </ButtonWrapper>
                        </Link>
                      </div>
                    </div>
                  </ModalWrapper>
                );
              }
              return render;
            }}
          </ProductContextConsumer>
        );
      }}
    </ThemeContextConsumer>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .modal {
    flex-basis: 0;
    padding: 1.5rem;
    border-radius: 0.4rem;
    box-shadow: 2px 2px 4px -2px rgba(0, 0, 0, 1);
    color: ${(props) => props.value.theme.secondary.text};
    border: 1px solid ${(props) => props.value.theme.secondary.dark};
    background-color: ${(props) => props.value.theme.secondary.main};
  }
  .modal-title {
    text-align: center;
    font-family: "Open Sans", sans-serif;
    text-transform: capitalize;
    font-weight: 400;
  }
  .image-wrapper {
    max-width: 320px;
    border: 1px solid ${(props) => props.value.theme.secondary.dark};
    border-radius: 0.4rem;
    overflow: hidden;
  }
  .name {
    color: ${(props) => props.value.theme.primary.text};
    text-align: center;
    font-size: 1.4rem;
    text-transform: uppercase;
    font-family: "Open Sans", sans-serif;
    margin-bottom: 0;
  }
  .price-wrapper {
    font-size: 2rem;
    color: ${(props) => props.value.theme.secondary.text};
    margin: 0.5rem 0;
  }
  .price {
    margin-left: 1rem;
    font-size: 2.4rem;
    color: ${(props) => props.value.theme.primary.main};
  }
  .controls {
    border: 1px solid ${(props) => props.value.theme.secondary.light};
    padding: 1rem;
    text-align: center;
  }
`;
