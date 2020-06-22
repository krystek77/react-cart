import React from "react";

export const asyncComponent = (importComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }

    componentDidMount() {
      importComponent().then((cmp) =>
        this.setState({ component: cmp.default })
      );
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};
