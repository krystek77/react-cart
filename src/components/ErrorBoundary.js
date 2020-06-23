import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
    };
  }

  //   static getDerivedStateFromError(err) {
  //     return { error: err };
  //   }

  componentDidCatch(error, info) {
    this.setState({
      error,
      info,
    });
  }

  render() {
    if (this.state.error.message)
      return (
        <div>
          <h1>Error occurs</h1>
          <p>{this.state.error.message}</p>
        </div>
      );
    return <div>{this.props.children}</div>;
  }
}
