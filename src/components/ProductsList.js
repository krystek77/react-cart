import React from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductContextConsumer } from "../context/product";
import Error from "./ErrorWrapper";
import CssSpinner from "./CssSpinner";

export default function ProductsList() {
  return (
    <div className="container">
      <div className="row">
        <Title title="our fresh, healthy, tasty fruits and vegetables" />
      </div>

      <ProductContextConsumer>
        {(value) => {
          let productsList = value.products.map((product) => {
            return <Product key={product.id} {...product} />;
          });
          if (value.error.message) productsList = <Error error={value.error} />;
          if (value.isLoading) productsList = <CssSpinner />;
          return <div className="row">{productsList}</div>;
        }}
      </ProductContextConsumer>
    </div>
  );
}
