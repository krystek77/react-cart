import React from "react";
import { products, productDetails } from "../store/data";

const ProductContext = React.createContext({
  products: [],
  productDetails: {},
  cart: [],
  isModalOpen: false,
  total: 0,
  isLoading: false,
  error: {},
});

class ProductContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productDetails: {},
      cart: [],
      isModalOpen: false,
      total: 0,
      isLoading: false,
      error: {},
    };
  }

  componentDidUpdate() {
    console.log("[ProductContextProvider]-updated");
  }
  componentDidMount() {
    console.log("[ProductContextProvider]-mounted");
    this.getProducts();
    // this.setProducts();
  }

  getProductsStart = () => {
    this.setState(() => ({ isLoading: true }));
  };
  getProductsEnd = () => {
    this.setState(() => ({ isLoading: false }));
  };
  getProductsFail = (err) => {
    const error = {
      message: err.message,
    };
    this.setState(() => ({ isLoading: false, error: error }));
  };

  getProducts = async () => {
    this.getProductsStart();
    try {
      const response = await fetch(
        "https://react-cart-9fc7d.firebaseio.com/products.json"
      );
      const data = await response.json();
      this.getProductsEnd();

      const products = [];
      for (let key in data) {
        products.push({ id: key, ...data[key] });
      }

      this.setState(() => {
        return {
          products: products,
        };
      });
    } catch (err) {
      console.log(err);
      this.getProductsFail(err);
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.products !== nextState.products ||
      this.state.productDetails !== nextState.productDetails ||
      this.state.isModalOpen !== nextState.isModalOpen ||
      this.state.cart.length !== nextState.cart.length ||
      this.state.cart !== nextState.cart ||
      this.state.total !== nextState.total ||
      this.state.error !== nextState.error ||
      this.state.isLoading !== nextState.isLoading
    );
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
    const tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getProduct(id));
    const tempProduct = { ...tempProducts[index] };
    tempProduct.inCart = true;
    tempProduct.count = 1;
    tempProduct.total = tempProduct.price;
    tempProducts[index] = tempProduct;
    this.setState(
      () => {
        return {
          products: tempProducts,
          productDetails: tempProduct,
          cart: [...this.state.cart, tempProduct],
        };
      },
      () => {
        this.countTotal();
      }
    );
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
        total: 0,
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
    this.setState(
      () => {
        return {
          cart: tempCart,
        };
      },
      () => {
        console.log("Callbak setState - counTotal");
        this.countTotal();
      }
    );
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
      this.setState(
        () => {
          return {
            cart: tempCart,
          };
        },
        () => {
          this.countTotal();
        }
      );
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

    this.setState(
      () => {
        return {
          cart: updatedCart,
          products: tempProducts,
        };
      },
      () => {
        this.countTotal();
      }
    );
  };
  countTotal = () => {
    console.log("counTotal");
    const total = this.state.cart
      .map(({ total }) => total)
      .reduce((sum, item) => sum + item, 0);
    this.setState({
      total,
    });
  };
  render() {
    console.log("[ProductContextProvider]-render", this.state.products);
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
