import React, { useContext } from "react";
import { ButtonWrapper } from "./Button";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../logo-min.png";
import { ThemeContextConsumer, themes } from "../context/theme";
import { AuthContextConsumer } from "../context/auth";
import { ProductContext } from "../context/product";

export default function Navbar() {
  const productContext = useContext(ProductContext);

  return (
    <ThemeContextConsumer>
      {(value) => {
        return (
          <AuthContextConsumer>
            {(auth) => {
              const isAuthenticated = auth.idToken !== "";
              return (
                <NavWrapper value={value}>
                  <Link to="/" className="brand-logo">
                    <img src={logo} alt="brand-logo" />
                  </Link>
                  <div className="nav-menu">
                    <ul className="nav">
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          activeClassName="active"
                          to="/"
                          exact
                        >
                          Products
                        </Link>
                      </li>
                      {!isAuthenticated && (
                        <React.Fragment>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              activeClassName="active"
                              to="/signin"
                            >
                              Signin
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              activeClassName="active"
                              to="/signup"
                            >
                              Signup
                            </Link>
                          </li>
                        </React.Fragment>
                      )}
                    </ul>
                    {isAuthenticated && (
                      <div className="controls">
                        <Link to="/cart">
                          <ButtonWrapper value={value} className="control-btn">
                            <span className="items-in-cart">
                              {productContext.cart.length > 0
                                ? productContext.cart.length
                                : 0}
                            </span>
                            <i
                              className="fa fa-cart-arrow-down btn-icon"
                              aria-hidden="true"
                            ></i>
                            <span className="btn-label">Cart</span>
                          </ButtonWrapper>
                        </Link>
                        <Link to="/signout">
                          <ButtonWrapper value={value} className="control-btn">
                            <i className="fas fa-sign-out-alt btn-icon"></i>
                            <span className="btn-label">Logout</span>
                          </ButtonWrapper>
                        </Link>
                      </div>
                    )}

                    <div>
                      <ButtonWrapper
                        navbar
                        className="control-btn"
                        value={value}
                        onClick={value.toggleTheme}
                      >
                        {value.theme === themes.orangeMagenta ? (
                          <i className="fas fa-toggle-on"></i>
                        ) : (
                          <i className="fas fa-toggle-off"></i>
                        )}
                      </ButtonWrapper>
                    </div>
                  </div>
                </NavWrapper>
              );
            }}
          </AuthContextConsumer>
        );
      }}
    </ThemeContextConsumer>
  );
}

const NavWrapper = styled.nav`
  background-color: ${(props) => props.value.theme.primary.main};
  color: ${(props) => props.value.theme.primary.text};
  border: 1px solid ${(props) => props.value.theme.primary.dark};
  box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0rem 1.5rem;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  .brand-logo {
    width: 5rem;
    display: block;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    @media (min-width: 768px) {
      width: 3rem;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  .nav-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    @media (min-width: 768px) {
      width: auto;
      margin-left: auto;
      flex-direction: row;
    }
  }
  .nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style-type: none;
    margin-right: 1.5rem;
    @media (min-width: 768px) {
      width: auto;
      margin-left: auto;
      flex-direction: row;
    }
  }
  .nav-item {
    border-bottom: 1px solid ${(props) => props.value.theme.primary.dark};
    @media (min-width: 768px) {
      border-right: 1px solid ${(props) => props.value.theme.primary.dark};
    }
  }
  .nav-item:first-child {
    border-top: 1px solid ${(props) => props.value.theme.primary.dark};
    @media (min-width: 768px) {
      border-left: 1px solid ${(props) => props.value.theme.primary.dark};
    }
  }
  .nav-link {
    display: block;
    color: ${(props) => props.value.theme.primary.text};
    font-size: 1.1rem;
    padding: 1rem;
    transition: all 0.3s ease-in-out;
  }
  .nav-link:hover {
    color: ${(props) => props.value.theme.primary.dark};
  }
  .nav-link.active {
    background-color: ${(props) => props.value.theme.primary.light};
    color: ${(props) => props.value.theme.primary.dark};
  }
  .controls {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    display: flex;
    align-items: center;
    @media (min-width: 768px) {
      padding-top: 0rem;
      padding-bottom: 0rem;
    }
    .items-in-cart {
      display: inline-block;
      margin-right: 0.5rem;
      color: ${(props) => props.value.theme.primary.text};
      font-weight: 600;
      box-sizing: border-box;
      border: 1px solid ${(props) => props.value.theme.primary.dark};
      background-color: ${(props) => props.value.theme.primary.light};
      font-size: 0.8rem;
      line-height: 1.2rem;
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
    }
  }
`;
