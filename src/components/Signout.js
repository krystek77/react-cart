import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ProductContext } from "../context/product";

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
    this.context.getProducts();
    this.context.clearCart();
  }
  render() {
    return <Redirect to="/" />;
  }
}

Signout.contextType = ProductContext;

export default Signout;
