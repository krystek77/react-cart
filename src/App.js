import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeContextConsumer } from "./context/theme";

import ProductsList from "./components/ProductsList";
import ProductDetails from "./components/ProductDetails";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Cart from "./components/Cart/Cart";

class App extends React.Component {
  state = {
    purchases: [],
  };
  componentDidMount() {
    this.getPurchases();
  }

  getPurchases = async () => {
    const response = await fetch(
      "https://purchase-list-688c1.firebaseio.com/purchases.json"
    );
    if (response.status === 200) {
      const responseData = await response.json();
      // console.log(responseData);
      const formattedResponseData = [];
      for (let key in responseData) {
        formattedResponseData.push({ id: key, ...responseData[key] });
      }
      // console.log(formattedResponseData);
      this.setState(
        () => {
          return {
            purchases: formattedResponseData,
          };
        },
        () => {
          console.log("Updated state now", this.state.purchases);
        }
      );
    }
  };

  render() {
    return (
      <div className="App">
        <ThemeContextConsumer>
          {(val) => {
            return (
              <React.Fragment>
                <nav>Navigacja</nav>
                <i class="fas fa-cart-plus"></i>
                <Switch>
                  <Route path="/signin" component={Signin} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/details" component={ProductDetails} />
                  <Route path="/" component={ProductsList} />
                </Switch>
              </React.Fragment>
            );
          }}
        </ThemeContextConsumer>
      </div>
    );
  }
}

export default App;
