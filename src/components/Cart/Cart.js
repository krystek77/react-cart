import React from "react";
import Title from "../Title";
import { ThemeContextConsumer } from "../../context/theme";
import { ProductContextConsumer } from "../../context/product";

export default function Cart() {
  return (
    <ThemeContextConsumer>
      {(theme) => {
        return (
          <ProductContextConsumer>
            {(data) => {
              let title = "Buy something please. I am so much empty and sad!";
              let content = null;
              if (data.cart.length > 0) {
                title = "Your cart is not empty. I'm so happy now ...";
                content = data.cart.map((item) => {
                  return <p key={item.id}>{item.name}</p>;
                });
              }
              return (
                <div className="container">
                  <div className="row">
                    <Title title={title} />
                  </div>
                  {content}
                </div>
              );
            }}
          </ProductContextConsumer>
        );
      }}
    </ThemeContextConsumer>
  );
}
