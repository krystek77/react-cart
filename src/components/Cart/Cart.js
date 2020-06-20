import React from "react";
import Title from "../Title";
import CartItem from "./CartItem";
import CartHeader from "./CartHeader";
import { ProductContextConsumer } from "../../context/product";
import { ThemeContextConsumer } from "../../context/theme";
import { ButtonWrapper } from "../Button";

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
                return (
                  <CartItem
                    key={item.id}
                    {...item}
                    remove={data.removeProduct}
                    increase={data.increaseProduct}
                    decrease={data.decreaseProduct}
                  />
                );
              })}
              <ThemeContextConsumer>
                {(theme) => (
                  <ButtonWrapper
                    clear
                    value={theme}
                    onClick={() => data.clearCart()}
                  >
                    Clear cart
                  </ButtonWrapper>
                )}
              </ThemeContextConsumer>
            </React.Fragment>
          );
        }
        return (
          <React.Fragment>
            <div className="container">
              <div className="row">
                <Title title={title} />
              </div>
            </div>
            <div className="container">{content}</div>
          </React.Fragment>
        );
      }}
    </ProductContextConsumer>
  );
}
