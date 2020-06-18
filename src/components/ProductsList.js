import React from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductContextConsumer } from "../context/product";

export default function ProductsList() {
  return (
    <div className="container">
      <div className="row">
        <Title title="our fresh, healthy, tasty fruits and vegetables" />
      </div>
      <div className="row">
        <ProductContextConsumer>
          {(value) => {
            return value.products.map((product) => {
              return <Product key={product.id} {...product} />;
            });
          }}
        </ProductContextConsumer>
      </div>
    </div>
  );
}
