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

  componentDidMount() {
    console.log("[auth.js]-mounted");
    this.checkAuthState();
  }

  checkExpiresInTime = (expiresInTime) => {
    console.log("check expiredIn", expiresInTime);
    setTimeout(this.signout, expiresInTime * 1000);
  };

  signout = () => {
    console.log("Signout user");
    this.setState(() => {
      return {
        isLoading: false,
        error: {},
        idUser: "",
        idToken: "",
        email: "",
      };
    });
    localStorage.removeItem("idUser");
    localStorage.removeItem("idToken");
    localStorage.removeItem("email");
    localStorage.removeItem("expiresInTimeDate");
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
          const expiresInTimeDate = new Date(
            new Date().getTime() + data.expiresIn * 1000
          );
          localStorage.setItem("idUser", data.localId);
          localStorage.setItem("idToken", data.idToken);
          localStorage.setItem("email", data.email);
          localStorage.setItem("expiresInTimeDate", expiresInTimeDate);
          this.checkExpiresInTime(data.expiresIn);
        }
      } catch (err) {
        this.signupBadRequest(err);
      }
    };
    signupUser();
  };

  checkAuthState = () => {
    const idToken = localStorage.getItem("idToken");
    console.log(idToken);
    if (!idToken) {
      this.signout();
    } else {
      const expiresInTimeDate = new Date(
        localStorage.getItem("expiresInTimeDate")
      );
      console.log(expiresInTimeDate);
      if (expiresInTimeDate > new Date()) {
        console.log("Signin user authomatically");
        const idUser = localStorage.getItem("idUser");
        const email = localStorage.getItem("email");
        this.setState(() => {
          return { idUser, email, idToken };
        });
        console.log(expiresInTimeDate - new Date());
        this.checkExpiresInTime(
          (expiresInTimeDate.getTime() - new Date().getTime()) / 1000
        );
      } else {
        console.log("Signout user.... if time elapsed");
        this.signout();
      }
    }
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
