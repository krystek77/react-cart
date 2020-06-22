import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ThemeContextProvider } from "./context/theme";
import { ProductContextProvider } from "./context/product";
import { AuthContextProvider } from "./context/auth";

const app = (
  <ThemeContextProvider>
    <AuthContextProvider>
      <ProductContextProvider>
        <Router>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Router>
      </ProductContextProvider>
    </AuthContextProvider>
  </ThemeContextProvider>
);
const container = document.getElementById("root");
ReactDOM.render(app, container);
