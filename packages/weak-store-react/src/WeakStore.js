import React from "react";
import { createWeakStore } from "weak-store";
import Context from "./Context";

function getDerivedStateFromProps(nextProps, prevState) {
  if (typeof nextProps.value !== "undefined") return { weakStore: undefined };
  if (prevState.value) return null;
  return { value: createWeakStore() };
}

export default class WeakStore extends React.Component {
  static get getDerivedStateFromProps() {
    return getDerivedStateFromProps;
  }

  static create = createWeakStore;

  state = {};

  render() {
    return (
      <Context.Provider value={this.state.value || this.props.value}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
