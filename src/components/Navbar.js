import React from "react";
import { ButtonWrapper } from "./Button";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../logo-min.png";
import { ThemeContextConsumer, themes } from "../context/theme";

export default function Navbar() {
  return (
    <ThemeContextConsumer>
      {(value) => (
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
            </ul>
            <Link to="/cart">
              <ButtonWrapper value={value}>
                <i
                  className="fa fa-cart-arrow-down btn-icon"
                  aria-hidden="true"
                ></i>
                <span className="btn-label">Cart</span>
              </ButtonWrapper>
            </Link>
            <ButtonWrapper value={value} onClick={value.toggleTheme}>
              {value.theme === themes.orangeMagenta ? (
                <i class="fas fa-toggle-on"></i>
              ) : (
                <i class="fas fa-toggle-off"></i>
              )}
            </ButtonWrapper>
          </div>
        </NavWrapper>
      )}
    </ThemeContextConsumer>
  );
}

const NavWrapper = styled.nav`
  background-color: ${(props) => props.value.theme.primary.main};
  color: ${(props) => props.value.theme.primary.text};
  border: 1px solid ${(props) => props.value.theme.primary.dark};
  box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 1);
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0rem 1.5rem;
  .brand-logo {
    width: 3rem;
  }
  .nav-menu {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  .nav {
    display: flex;
    list-style-type: none;
    margin-right: 1.5rem;
  }
  .nav-item {
    border-right: 1px solid ${(props) => props.value.theme.primary.dark};
  }
  .nav-item:first-child {
    border-left: 1px solid ${(props) => props.value.theme.primary.dark};
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
`;
