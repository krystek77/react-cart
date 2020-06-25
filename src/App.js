import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import ProductsList from "./components/ProductsList";
import ProductDetails from "./components/ProductDetails";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Signout from "./components/Signout";
import Cart from "./components/Cart/Cart";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import { AuthContextConsumer } from "./context/auth";
import Greeting from "./components/Greeting";

class App extends React.Component {
  componentDidUpdate() {
    console.log("[App.js]-updated");
  }
  componentDidMount() {
    console.log("[App.js]-mounted");
  }
  render() {
    return (
      <AuthContextConsumer>
        {(auth) => {
          const isAuthenticated = auth.idToken !== "";
          let routes = (
            <Switch>
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path="/details" component={ProductDetails} />
              <Route path="/" exact component={ProductsList} />
              <Redirect to="/" />
            </Switch>
          );
          if (isAuthenticated) {
            routes = (
              <Switch>
                <Route
                  path="/signout"
                  render={(props) => (
                    <Signout signout={auth.signout} {...props} />
                  )}
                />
                <Route path="/cart" component={Cart} />
                <Route path="/details" component={ProductDetails} />
                <Route path="/" exact component={ProductsList} />
                <Redirect to="/" />
              </Switch>
            );
          }
          return (
            <div className="App">
              <Modal />
              <Navbar />
              <Greeting />
              {routes}
              <Footer />
            </div>
          );
        }}
      </AuthContextConsumer>
    );
  }
}

export default App;
