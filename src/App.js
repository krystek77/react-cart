import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import ProductsList from "./components/ProductsList";
import ProductDetails from "./components/ProductDetails";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Cart from "./components/Cart/Cart";
import Modal from "./components/Modal";
import Footer from "./components/Footer";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Modal />
        <Navbar />
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/cart" component={Cart} />
          <Route path="/details" component={ProductDetails} />
          <Route path="/" component={ProductsList} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
