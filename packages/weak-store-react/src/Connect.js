import React from "react";
import withWeakStore from "./withWeakStore";

function getDerivedStateFromProps(nextProps, prevState) {
  const nextState = {
    to: nextProps.to,
    setState: nextProps.weakStore.setState,
    value: {
      state: nextProps.weakStore.getState(nextProps.to)
    }
  };

  const hasChanges =
    !prevState.value ||
    nextState.to !== prevState.to ||
    nextState.value.state !== prevState.value.state ||
    nextState.setState !== prevState.setState;

  if (hasChanges) {
    nextState.value.setState = nextState.setState.bind(null, nextState.to);
    return nextState;
  }

  return null;
}

class Connect extends React.PureComponent {
  static get getDerivedStateFromProps() {
    return getDerivedStateFromProps;
  }

  state = {};

  componentDidMount() {
    const updater = state => getDerivedStateFromProps(this.props, state);

    this.componentWillUnmount = this.props.weakStore.subscribe(() => {
      this.setState(updater);
    });

    this.setState(updater);
  }

  componentDidUpdate(prevProps) {
    if (this.props.weakStore === prevProps.weakStore) return;
    this.componentWillUnmount();
    this.componentDidMount();
  }

  render() {
    return this.props.children(this.state.value);
  }
}

export default withWeakStore(Connect);
