import React from "react";
import { products, productDetails } from "../store/data";

const ProductContext = React.createContext({
  products: [],
  productDetails: {},
});

class ProductContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productDetails: null,
    };
  }

  componentDidMount() {
    console.log("[ProductContextProvider]-mounted");
    this.setProducts();
  }
  setProducts = () => {
    const tempProducts = [];
    const tempProductDetails = { ...productDetails };

    products.forEach((product) => {
      tempProducts.push({ ...product });
    });
    this.setState(
      () => {
        return {
          products: tempProducts,
          productDetails: tempProductDetails,
        };
      },
      () => {}
    );
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductContextConsumer = ProductContext.Consumer;

export { ProductContextProvider, ProductContextConsumer };
