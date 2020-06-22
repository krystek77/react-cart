import React, { Component } from "react";

const AuthContext = React.createContext({
  isLoading: false,
  error: {},
  idUser: "",
  token: "",
});

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: {},
      idUser: "",
      token: "",
    };
  }
  signupStart = () => {
    console.log("Start auth");
  };
  signupFail = () => {
    console.log("Fail auth");
  };
  signup = (dataAuth) => {
    console.log("Auth", dataAuth);
  };
  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          signupStart: this.signupStart,
          signup: this.signup,
          signupFail: this.signupFail,
        }}
      ></AuthContext.Provider>
    );
  }
}

const AuthContextConsumer = AuthContext.Consumer;
export { AuthContextProvider, AuthContextConsumer };
