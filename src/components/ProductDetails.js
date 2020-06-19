import React, { useEffect } from "react";
import Title from "./Title";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeContextConsumer } from "../context/theme";
import { ProductContextConsumer } from "../context/product";
import { ButtonWrapper } from "./Button";

export default function ProductDetails(props) {
  useEffect(() => {
    console.log("[ProductDetails]-mounted");
    return () => {
      console.log("[ProductDetails]-unmounted");
    };
  });
  return (
    <div className="container">
      <ThemeContextConsumer>
        {(theme) => {
          return (
            <ProductContextConsumer>
              {(data) => {
                const {
                  productDetails: {
                    id,
                    img,
                    price,
                    description,
                    name,
                    origin,
                    inCart,
                  },
                  addToCart,
                } = data;
                return (
                  <ProductDetilsWrapper value={theme}>
                    <div className="row">
                      <Title title={name} />
                    </div>
                    <div className="row">
                      <div className="col-10 mx-auto col-md-6">
                        <img src={img} alt={img} />
                      </div>

                      <div className="col-10 mx-auto col-md-6">
                        <h2 className="product-name">
                          Name: <span className="name">{name}</span>
                        </h2>
                        <p className="product-origin">
                          Country of origin:
                          <strong className="origin">{origin}</strong>
                        </p>
                        <p className="product-price">
                          Price:
                          <strong className="price">
                            {price && price.toFixed(2)} Euro
                          </strong>
                        </p>
                        <h3 className="description-title">
                          Some info about it
                        </h3>
                        <p className="description">{description}</p>
                        <div className="controls"></div>
                        <Link to="/">
                          <ButtonWrapper value={theme}>
                            Back to products
                          </ButtonWrapper>
                        </Link>
                        <ButtonWrapper
                          disabled={inCart ? true : false}
                          value={theme}
                          onClick={() => addToCart(id)}
                        >
                          {inCart ? "In cart" : "Add to cart"}
                        </ButtonWrapper>
                      </div>
                    </div>
                  </ProductDetilsWrapper>
                );
              }}
            </ProductContextConsumer>
          );
        }}
      </ThemeContextConsumer>
    </div>
  );
}

const ProductDetilsWrapper = styled.div`
  .product-name {
    font-size: 1.6rem;
  }
  .name {
    margin-left: 1rem;
    text-transform: capitalize;
  }
  .product-origin {
    font-family: "Open Sans", sans-serif;
    font-size: 2rem;
    font-style: italic;
    color: ${(props) => props.value.theme.primary.main};
    text-transform: capitalize;
  }
  .origin {
    display: block;
    color: ${(props) => props.value.theme.primary.dark};
  }
  .product-price {
    font-size: 2rem;
    color: ${(props) => props.value.theme.secondary.dark};
  }
  .price {
    margin-left: 1rem;
    font-size: 2.4rem;
  }
  .description-title {
    font-size: 1.2rem;
  }
  .description {
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 1.5;
  }
`;
