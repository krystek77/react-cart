import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ThemeContextProvider } from "./context/theme";

const app = (
  <ThemeContextProvider>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </ThemeContextProvider>
);
const container = document.getElementById("root");
ReactDOM.render(app, container);
