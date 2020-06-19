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
      productDetails: {},
    };
  }

  componentDidUpdate() {
    console.log("[ProductContextProvider]-updated");
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

  getProduct = (id) => {
    return this.state.products.find((product) => product.id === id);
  };

  addToCart = (id) => {
    console.log("Add to cart", id);
  };
  handleProductDetails = (id) => {
    // console.log("Display product details", id);
    // console.log(this.getProduct(id));
    const productDetails = this.getProduct(id);
    this.setState(
      () => {
        return {
          productDetails: productDetails,
        };
      },
      () => {
        // console.log(this.state.productDetails);
      }
    );
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
          displayDetails: this.handleProductDetails,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductContextConsumer = ProductContext.Consumer;

export { ProductContextProvider, ProductContextConsumer };
