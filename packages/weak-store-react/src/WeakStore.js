import React from "react";
import { createWeakStore } from "weak-store";

/* istanbul ignore next */
const Context = React.createContext({
  getState: namespace => namespace.state,
  setState: () => {},
  subscribe: () => () => {}
});

function getDerivedStateFromProps(nextProps, prevState) {
  if (typeof nextProps.value !== "undefined") return { value: undefined };
  /* istanbul ignore next */
  if (prevState.value) return null;
  return { value: createWeakStore() };
}

export default class WeakStore extends React.Component {
  static get Consumer() {
    return Context.Consumer;
  }

  static get getDerivedStateFromProps() {
    return getDerivedStateFromProps;
  }

  state = {};

  render() {
    return (
      <Context.Provider value={this.state.value || this.props.value}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
