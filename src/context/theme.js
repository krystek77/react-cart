import React from "react";

const themes = {
  orangeMagenta: {
    primary: {
      main: "#8B008B",
      light: "#BE46BC",
      dark: "#59005D",
      text: "#FFFFFF",
    },
    secondary: {
      main: "#FFA600",
      light: "#FFD74A",
      dark: "#C67700",
      text: "#000000",
    },
  },
  magentaOrange: {
    primary: {
      main: "#FFA600",
      light: "#FFD74A",
      dark: "#C67700",
      text: "#000000",
    },
    secondary: {
      main: "#8B008B",
      light: "#BE46BC",
      dark: "#59005D",
      text: "#FFFFFF",
    },
  },
};

const ThemeContext = React.createContext({
  theme: themes.orangeMagenta,
  toggleTheme: () => {},
});

class ThemeContextProvider extends React.Component {
  constructor(props) {
    // console.log("[ThemeContextProvider] - constructor");
    super(props);
    this.state = {
      theme: themes.orangeMagenta,
    };
  }
  componentDidUpdate() {
    // console.log("[ThemeContextProvider] - updated");
  }
  componentDidMount() {
    // console.log("[ThemeContextProvider] - mounted");
  }

  toggleTheme() {
    // console.log("TOGGLE THEME");
    this.setState(
      (prevState, props) => {
        // console.log("[ThemeContextProvider] - setState");
        return {
          theme:
            prevState.theme === themes.orangeMagenta
              ? themes.magentaOrange
              : themes.orangeMagenta,
        };
      },
      () => {
        // console.log("Theme changed", this.state.theme);
      }
    );
  }
  render() {
    // console.log("[ThemeContextProvider] - render", this.state.theme);
    const { children } = this.props;
    return (
      <ThemeContext.Provider
        value={{ ...this.state, toggleTheme: this.toggleTheme.bind(this) }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
}
const ThemeContextConsumer = ThemeContext.Consumer;

export { ThemeContextProvider, ThemeContextConsumer, themes };
