import React from "react";
import Title from "../Title";
import CartItem from "./CartItem";
import CartHeader from "./CartHeader";
import Summary from "./Summary";
import { ProductContext } from "../../context/product";
import { ThemeContextConsumer } from "../../context/theme";
import { ButtonWrapper } from "../Button";
import Spinner from "../CssSpinner";
import Error from "../ErrorWrapper";

export default class Cart extends React.Component {
  componentDidUpdate() {}
  componentDidMount() {
    this.context.getCartItems();
  }

  render() {
    let title = "Buy something please. I am so much empty and sad!";
    let content = null;
    if (this.context.error.message)
      content = <Error error={this.context.error} />;
    if (this.context.isLoading) content = <Spinner />;

    if (!this.context.error.message && this.context.cart.length > 0) {
      title = "Your cart is not empty. I'm so happy now ...";
      content = (
        <React.Fragment>
          <CartHeader />
          {this.context.cart.map((item) => {
            return (
              <CartItem
                key={item.id}
                {...item}
                remove={this.context.removeProduct}
                increase={this.context.increaseProduct}
                decrease={this.context.decreaseProduct}
              />
            );
          })}
          <ThemeContextConsumer>
            {(theme) => (
              <React.Fragment>
                <div className="row">
                  <ButtonWrapper
                    clear
                    value={theme}
                    onClick={() => this.context.clearCart()}
                  >
                    Clear cart
                  </ButtonWrapper>
                </div>
                <div className="row">
                  <Summary value={theme} total={this.context.total} />
                </div>
              </React.Fragment>
            )}
          </ThemeContextConsumer>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {!this.context.error.message && (
          <div className="container">
            <div className="row">
              <Title title={title} />
            </div>
          </div>
        )}
        <div className="container">{content}</div>
      </React.Fragment>
    );
  }
}

Cart.contextType = ProductContext;
