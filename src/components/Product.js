import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeContextConsumer } from "../context/theme";
import { ProductContextConsumer } from "../context/product";
import PropTypes from "prop-types";
import NumberProductInCart from "./NumberInCart";

export default function Product(props) {
  const { id, img, price, name, inCart, count } = props;
  return (
    <ThemeContextConsumer>
      {(value) => {
        return (
          <ProductWrapper
            value={value}
            className="col-10 mx-auto col-md-6 col-lg-3 my-2"
          >
            <div className="card">
              <ProductContextConsumer>
                {(data) => {
                  return (
                    <div
                      className="image-container"
                      onClick={() => data.displayDetails(id)}
                    >
                      <Link to="/details" className="image-link">
                        <img className="image" src={img} alt={img} />
                      </Link>

                      <button
                        className="btn-inCart"
                        disabled={
                          inCart || localStorage.getItem("idToken") === null
                            ? true
                            : false
                        }
                        onClick={() => {
                          data.addToCart(id);
                          data.openModal();
                        }}
                      >
                        {inCart ? (
                          "inCart"
                        ) : (
                          <i
                            className="fa fa-cart-arrow-down"
                            aria-hidden="true"
                          ></i>
                        )}
                      </button>
                      <NumberProductInCart count={count} />
                    </div>
                  );
                }}
              </ProductContextConsumer>
              <div className="footer-card">
                <h2 className="fruit-name">{name}</h2>
                <span className="fruit-price">
                  Euro: <strong>{price.toFixed(2)}</strong>
                </span>
              </div>
            </div>
          </ProductWrapper>
        );
      }}
    </ThemeContextConsumer>
  );
}

const ProductWrapper = styled.div`
  .card {
    border: 1px solid ${(props) => props.value.theme.primary.dark};
    background-color: ${(props) => props.value.theme.primary.light};
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
    border-radius: 0.4rem;
    min-height: 327px;
    overflow: hidden;
  }
  .image-container {
    padding: 10px;
    position: relative;
  }
  .image-link {
    border-radius: 0.4rem;
    display: block;
    overflow: hidden;
    border: 1px solid ${(props) => props.value.theme.primary.dark};
  }
  .image {
    transform: scale(1);
    transition: transform 0.5s ease-in-out;
  }
  .image-container:hover .image {
    transform: scale(1.2);
  }
  .btn-inCart {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 1.1rem;
    padding: 0.5rem 0.8rem;
    border-radius: 0.2rem;
    transform: translate(130%, 100%);
    cursor: pointer;
    color: ${(props) => props.value.theme.secondary.text};
    background-color: ${(props) => props.value.theme.secondary.main};
    border: 1px solid ${(props) => props.value.theme.secondary.dark};
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${(props) => props.value.theme.secondary.dark};
    }
    &:focus {
      outline: none;
    }
  }
  .btn-inCart:disabled {
    background-color: grey;
    border: 1px solid grey;
    color: darkgrey;
    pointer-events: none;
    cursor: none !important;
  }
  .image-container:hover .btn-inCart {
    transform: translate(0, 0);
  }
  .footer-card {
    display: flex;
    padding: 0rem 1.5rem;
    align-items: center;
    justify-content: space-between;
  }
  .fruit-name {
    color: ${(props) => props.value.theme.primary.text};
    font-size: 1.2rem;
    text-transform: capitalize;
    font-weight: 400;
  }
  .fruit-price {
    font-size: 1.2rem;
    font-weight: 400;
    strong {
      font-size: 1.4rem;
      font-weight: 700;
    }
  }
`;

Product.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  inCart: PropTypes.bool.isRequired,
};
