import React, { Component } from "react";

const AuthContext = React.createContext({
  isLoading: false,
  error: {},
  idUser: "",
  token: "",
  signupStart: () => {},
  signup: () => {},
  signupFail: () => {},
});

const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: {},
      idUser: "",
      idToken: "",
      email: "",
    };
  }
  checkExpiresInTime = (expiresInTime) => {
    setTimeout(this.signout, expiresInTime);
  };
  signout = () => {
    console.log("User was signout after elapsed time");
    this.setState(() => {
      return {
        isLoading: false,
        error: {},
        idUser: "",
        idToken: "",
        email: "",
      };
    });
  };

  signupStart = () => {
    console.log("Start auth");
    this.setState(() => {
      return { isLoading: true };
    });
  };

  signupFail = (err) => {
    const { code, message } = err;
    const error = { code, message };
    this.setState(() => {
      return {
        error,
        idUser: "",
        idToken: "",
        email: "",
        isLoading: false,
      };
    });
  };

  signupBadRequest = (err) => {
    const error = { message: err.message };
    this.setState(() => {
      return {
        error,
        isLoading: false,
      };
    });
  };

  signup = (dataAuth) => {
    this.signupStart();

    const signupUser = async () => {
      try {
        const response = await fetch(SIGNUP_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: dataAuth.email,
            password: dataAuth.password,
            returnSecureToken: true,
          }),
        });
        const data = await response.json();
        if (data.error) {
          this.signupFail(data.error);
        } else {
          this.setState(() => {
            return {
              idUser: data.localId,
              idToken: data.idToken,
              email: data.email,
              error: {},
              isLoading: false,
            };
          });
          this.checkExpiresInTime(data.expiresIn);
        }
      } catch (err) {
        this.signupBadRequest(err);
      }
    };
    signupUser();
  };

  render() {
    console.log("[auth.js] - render", this.state);
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          signupStart: this.signupStart,
          signup: this.signup,
          signupFail: this.signupFail,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthContextConsumer = AuthContext.Consumer;
export { AuthContextProvider, AuthContextConsumer };
