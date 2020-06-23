import React from "react";

const withErrors = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
    }

    componentDidCatch(err, infoStack) {
      this.setState({
        error: err,
        info: infoStack,
      });
    }
    render() {
      if (this.state.error)
        return (
          <div>
            <h1>Error occured</h1>
            <p>{this.state.error.message}</p>
          </div>
        );
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withErrors;
