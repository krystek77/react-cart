import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
  }
  render() {
    return <Redirect to="/" />;
  }
}
export default Signout;
