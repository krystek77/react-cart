import React from "react";
import { products, productDetails } from "../store/data";

const ProductContext = React.createContext({
  products: [],
  productDetails: {},
  cart: [],
  isModalOpen: false,
});

class ProductContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productDetails: {},
      cart: products, //temporary
      isModalOpen: false,
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

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.productDetails !== nextState.productDetails ||
      this.state.isModalOpen !== nextState.isModalOpen ||
      this.state.cart.length !== nextState.cart.length ||
      this.state.cart !== nextState.cart
    );
  }
  getProduct = (id) => {
    return this.state.products.find((product) => product.id === id);
  };

  addToCart = (id) => {
    const tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getProduct(id));
    const tempProduct = { ...tempProducts[index] };
    tempProduct.inCart = true;
    tempProduct.count = 1;
    tempProduct.total = tempProduct.price;
    tempProducts[index] = tempProduct;
    this.setState(() => {
      return {
        products: tempProducts,
        productDetails: tempProduct,
        cart: [...this.state.cart, tempProduct],
      };
    });
  };
  handleProductDetails = (id) => {
    const productDetails = this.getProduct(id);
    this.setState(() => {
      return {
        productDetails: productDetails,
      };
    });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  compose = (...func) => (x) => func.reduce((acc, fn) => fn(acc), x);
  compose = (...func) => (x) => func.reduceRight((acc, fn) => fn(acc), x);

  handleClearCart = () => {
    const tempProducts = this.state.products.map((product) => {
      const tempProduct = product;
      tempProduct.inCart = false;
      tempProduct.count = 0;
      tempProduct.total = 0;
      return tempProduct;
    });
    this.setState(() => {
      return {
        products: tempProducts,
        cart: [],
      };
    });
  };

  handleIncreaseProduct = (id) => {
    console.log("Increase ...", id);
    const tempCart = [...this.state.cart];
    const index = tempCart.findIndex((product) => product.id === id);
    const tempProduct = { ...tempCart[index] };
    tempProduct.count = tempProduct.count + 1;
    tempProduct.total = tempProduct.count * tempProduct.price;
    tempCart[index] = tempProduct;
    this.setState(() => {
      return {
        cart: tempCart,
      };
    });
  };

  handleDecreaseProduct = (id) => {
    console.log("Decrease ...", id);
    const tempCart = [...this.state.cart];
    const index = tempCart.findIndex((product) => product.id === id);
    const tempProduct = { ...tempCart[index] };
    tempProduct.count = tempProduct.count - 1;
    if (tempProduct.count === 0) {
      this.handleRemoveProduct(id);
    } else {
      tempProduct.total = tempProduct.total - tempProduct.price;
      tempCart[index] = tempProduct;
      this.setState(() => {
        return {
          cart: tempCart,
        };
      });
    }
  };
  handleRemoveProduct = (id) => {
    const updatedCart = this.state.cart.filter((product) => product.id !== id);
    const tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getProduct(id));
    const tempProduct = { ...tempProducts[index] };
    tempProduct.inCart = false;
    tempProduct.count = 0;
    tempProduct.total = 0;
    tempProducts[index] = tempProduct;

    this.setState(() => {
      return {
        cart: updatedCart,
        products: tempProducts,
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
          displayDetails: this.handleProductDetails,
          openModal: this.openModal,
          closeModal: this.closeModal,
          clearCart: this.handleClearCart,
          increaseProduct: this.handleIncreaseProduct,
          decreaseProduct: this.handleDecreaseProduct,
          removeProduct: this.handleRemoveProduct,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductContextConsumer = ProductContext.Consumer;

export { ProductContextProvider, ProductContextConsumer };
