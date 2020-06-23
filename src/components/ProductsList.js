import React from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductContextConsumer } from "../context/product";
import { Error } from "./ErrorWrapper";

export default function ProductsList() {
  return (
    <div className="container">
      <div className="row">
        <Title title="our fresh, healthy, tasty fruits and vegetables" />
      </div>
      <div className="row">
        <ProductContextConsumer>
          {(value) => {
            console.log(value);
            let productsList = value.products.map((product) => {
              return <Product key={product.id} {...product} />;
            });
            if (value.error.message)
              productsList = <Error error={value.error} />;
            return productsList;
          }}
        </ProductContextConsumer>
      </div>
    </div>
  );
}
