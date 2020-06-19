import React from "react";
import Title from "../Title";
import CartItem from "./CartItem";
import CartHeader from "./CartHeader";
import { ProductContextConsumer } from "../../context/product";

export default function Cart() {
  return (
    <ProductContextConsumer>
      {(data) => {
        let title = "Buy something please. I am so much empty and sad!";
        let content = null;
        if (data.cart.length > 0) {
          title = "Your cart is not empty. I'm so happy now ...";
          content = (
            <React.Fragment>
              <CartHeader />
              {data.cart.map((item) => {
                return <CartItem key={item.id} {...item} />;
              })}
              ;
            </React.Fragment>
          );
        }
        return (
          <div className="container">
            <div className="row">
              <Title title={title} />
            </div>
            <div className="container">{content}</div>
          </div>
        );
      }}
    </ProductContextConsumer>
  );
}
