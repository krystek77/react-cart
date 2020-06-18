import React from "react";
import "./App.css";
import { ThemeContextConsumer } from "./context/theme";

class App extends React.Component {
  state = {
    purchases: [],
  };
  componentDidMount() {
    this.getPurchases();
  }

  getPurchases = async () => {
    const response = await fetch(
      "https://purchase-list-688c1.firebaseio.com/purchases.json"
    );
    if (response.status === 200) {
      const responseData = await response.json();
      // console.log(responseData);
      const formattedResponseData = [];
      for (let key in responseData) {
        formattedResponseData.push({ id: key, ...responseData[key] });
      }
      // console.log(formattedResponseData);
      this.setState(
        () => {
          return {
            purchases: formattedResponseData,
          };
        },
        () => {
          console.log("Updated state now", this.state.purchases);
        }
      );
    }
  };

  render() {
    return (
      <div className="App">
        <p>Hello Cart</p>
        <ThemeContextConsumer>
          {(val) => {
            return (
              <React.Fragment>
                <p style={{ color: val.theme.primary.main }}>I am a cameleon</p>
                <button
                  type="button"
                  onClick={() => val.toggleTheme()}
                  style={{
                    backgroundColor: val.theme.primary.main,
                    color: val.theme.primary.text,
                    border: `1px solid ${val.theme.primary.dark}`,
                    borderRadius: "5px",
                    padding: "10px 15px",
                    cursor: "pointer",
                  }}
                >
                  Switch theme button
                </button>
                {this.state.purchases.map((purchase) => {
                  return (
                    <p
                      style={{ border: `1px solid ${val.theme.primary.dark}` }}
                      key={purchase.id}
                    >
                      {purchase.name}
                    </p>
                  );
                })}
              </React.Fragment>
            );
          }}
        </ThemeContextConsumer>
      </div>
    );
  }
}

export default App;
