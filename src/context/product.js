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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (localStorage.getItem("idToken") !== null) {
      this.countTotal();
      this.synchronizeProductsWithCart(
        this.state.products,
        this.state.cart,
        prevState
      );
    }
  }

  synchronizeProductsWithCart = (productItems, cartItems, prevState) => {
    const products = productItems;
    const cart = cartItems;

    cart.forEach((cartItem) => {
      const updatedProductIndex = products.findIndex((product) => {
        return product.id === cartItem.idProduct;
      });

      if (updatedProductIndex !== -1) {
        const updatedProduct = { ...products[updatedProductIndex] };
        updatedProduct.inCart = cartItem.inCart;
        updatedProduct.count = cartItem.count;
        updatedProduct.total = cartItem.total;
        products[updatedProductIndex] = updatedProduct;
      }
    });
    products.forEach(({ id, count, total }) => {
      prevState.products.forEach((prevProduct) => {
        if (
          id !== prevProduct.id ||
          count !== prevProduct.count ||
          total !== prevProduct.total
        ) {
          this.setState(() => {
            return {
              products: products,
            };
          });
        }
      });
    });
  };

  componentDidMount() {
    if (localStorage.getItem("idToken") !== null) {
      this.getCartItems();
    } else {
      this.getProducts();
    }
  }

  getCartItems = () => {
    this.startDownloadingData();

    const fetchCartItems = async () => {
      try {
        const queryParams = `?auth=${localStorage.getItem(
          "idToken"
        )}&orderBy="idUser"&equalTo="${localStorage.getItem("idUser")}"`;

        const response = await fetch(
          "https://react-cart-9fc7d.firebaseio.com/cart.json" + queryParams
        );
        const data = await response.json();
        if (data.error) {
          const error = {};
          error.message = data.error;
          this.downloadDataFailed(error);
        } else {
          const cart = [];
          for (let key in data) {
            cart.push({ id: key, ...data[key] });
          }
          this.setState(() => {
            return {
              cart: cart,
            };
          });
          this.endDonwloadingData();
        }
      } catch (error) {
        this.downloadDataFailed(error);
      }
    };
    fetchCartItems();
  };

  startDownloadingData = () => {
    this.setState(() => ({ isLoading: true }));
  };
  endDonwloadingData = () => {
    this.setState(() => ({ isLoading: false }));
  };
  downloadDataFailed = (err) => {
    const error = {
      message: err.message,
    };
    this.setState(() => ({ isLoading: false, error: error }));
  };

  getProducts = async () => {
    this.startDownloadingData();
    try {
      const response = await fetch(
        "https://react-cart-9fc7d.firebaseio.com/products.json"
      );
      const data = await response.json();
      this.endDonwloadingData();

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
      this.downloadDataFailed(err);
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

    const cartItem = {
      idProduct: tempProduct.id,
      img: tempProduct.img,
      price: tempProduct.price,
      count: tempProduct.count,
      total: tempProduct.total,
      inCart: tempProduct.inCart,
      description: tempProduct.description,
      name: tempProduct.name,
      origin: tempProduct.origin,
      idUser: localStorage.getItem("idUser"),
      added: new Date().toISOString(),
    };

    const addCartItem = async () => {
      try {
        const response = await fetch(
          "https://react-cart-9fc7d.firebaseio.com/cart.json?auth=" +
            localStorage.getItem("idToken"),
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartItem),
          }
        );
        const data = await response.json();

        this.setState(
          () => {
            return {
              products: tempProducts,
              productDetails: tempProduct,
              cart: [...this.state.cart, { id: data.name, ...cartItem }],
            };
          },
          () => {
            this.countTotal();
          }
        );
      } catch (error) {}
    };
    addCartItem();
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
      const tempProduct = { ...product };
      tempProduct.inCart = false;
      tempProduct.count = 0;
      tempProduct.total = 0;
      return tempProduct;
    });

    let numberOfDeletedCartItems = 0;
    const updateClearCart = async (id) => {
      try {
        await fetch(`https://react-cart-9fc7d.firebaseio.com/cart/${id}.json`, {
          method: "DELETE",
        });

        numberOfDeletedCartItems += 1;

        if (this.state.cart.length === numberOfDeletedCartItems) {
          this.setState(() => {
            return {
              products: tempProducts,
              cart: [],
              total: 0,
            };
          });
        }
      } catch (error) {
        this.downloadDataFailed(error);
      }
    };
    if (localStorage.getItem("idToken") !== null) {
      this.state.cart.forEach(({ id }) => {
        updateClearCart(id);
      });
    } else {
      this.setState(() => {
        return {
          products: tempProducts,
          cart: [],
          total: 0,
        };
      });
    }
  };

  handleIncrementCartItem = (id) => {
    const tempCart = [...this.state.cart];
    const index = tempCart.findIndex((cart) => cart.id === id);
    const tempProduct = { ...tempCart[index] };
    tempProduct.count = tempProduct.count + 1;
    tempProduct.total = tempProduct.count * tempProduct.price;
    tempCart[index] = tempProduct;
    const products = [...this.state.products];
    const incrementProductsIndex = products.findIndex((product) => {
      return product.id === tempProduct.idProduct;
    });
    const incrementProduct = { ...products[incrementProductsIndex] };
    incrementProduct.count = tempProduct.count;
    incrementProduct.total = tempProduct.total;
    products[incrementProductsIndex] = incrementProduct;

    const updateIncrementCartItem = async () => {
      const updatedCartItemValues = {
        count: tempProduct.count,
        total: tempProduct.total,
      };

      try {
        await fetch(`https://react-cart-9fc7d.firebaseio.com/cart/${id}.json`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCartItemValues),
        });

        this.setState(
          () => {
            return {
              cart: tempCart,
              products: products,
            };
          },
          () => {
            this.countTotal();
          }
        );
      } catch (error) {
        this.downloadDataFailed(error);
      }
    };
    updateIncrementCartItem();
  };

  handleDecrementCartItem = (id) => {
    const tempCart = [...this.state.cart];
    const index = tempCart.findIndex((cart) => cart.id === id);
    const tempProduct = { ...tempCart[index] };
    tempProduct.count = tempProduct.count - 1;

    const products = [...this.state.products];
    const decrementProductsIndex = products.findIndex(
      (product) => product.id === tempProduct.idProduct
    );
    const decrementProduct = { ...products[decrementProductsIndex] };
    decrementProduct.count = tempProduct.count;

    const updateDecrementCartItem = async () => {
      const updatedCartItemValues = {
        count: tempProduct.count,
        total: tempProduct.total,
      };
      try {
        await fetch(`https://react-cart-9fc7d.firebaseio.com/cart/${id}.json`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCartItemValues),
        });

        this.setState(
          () => {
            return {
              cart: tempCart,
              products: products,
            };
          },
          () => {
            this.countTotal();
          }
        );
      } catch (error) {
        this.downloadDataFailed(error);
      }
    };

    if (tempProduct.count === 0) {
      this.handleRemoveCartItem(id);
    } else {
      tempProduct.total = tempProduct.total - tempProduct.price;
      decrementProduct.total = tempProduct.total;
      products[decrementProductsIndex] = decrementProduct;
      tempCart[index] = tempProduct;
      updateDecrementCartItem();
    }
  };

  handleRemoveCartItem = (id) => {
    const updatedCart = this.state.cart.filter((cart) => cart.id !== id);
    const removedCartItem = this.state.cart.find((cart) => cart.id === id);
    const idProduct = removedCartItem.idProduct;
    const tempProducts = [...this.state.products];
    const index = tempProducts.findIndex((product) => product.id === idProduct);

    const tempProduct = { ...tempProducts[index] };
    tempProduct.inCart = false;
    tempProduct.count = 0;
    tempProduct.total = 0;
    tempProducts[index] = tempProduct;

    const updateRemoveCartItem = async () => {
      try {
        await fetch(`https://react-cart-9fc7d.firebaseio.com/cart/${id}.json`, {
          method: "DELETE",
        });
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
      } catch (error) {
        this.downloadDataFailed(error);
      }
    };
    updateRemoveCartItem();
  };

  countTotal = () => {
    const total = this.state.cart
      .map(({ total }) => total)
      .reduce((sum, item) => sum + item, 0);
    this.setState({
      total,
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          getProducts: this.getProducts,
          getCartItems: this.getCartItems,
          addToCart: this.addToCart,
          displayDetails: this.handleProductDetails,
          openModal: this.openModal,
          closeModal: this.closeModal,
          clearCart: this.handleClearCart,
          increaseProduct: this.handleIncrementCartItem,
          decreaseProduct: this.handleDecrementCartItem,
          removeProduct: this.handleRemoveCartItem,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductContextConsumer = ProductContext.Consumer;

export { ProductContextProvider, ProductContextConsumer, ProductContext };
