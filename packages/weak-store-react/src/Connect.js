import React from "react";
import withWeakStore from "./withWeakStore";

function getDerivedStateFromProps(nextProps, prevState) {
  const nextState = {
    state: nextProps.weakStore.getState(nextProps.to)
  };

  if (nextProps.to !== prevState.UNSAFE_to) {
    nextState.UNSAFE_to = nextProps.to;
    nextState.setState = nextProps.weakStore.setState.bind(null, nextProps.to);
  } else if (nextState.state === prevState.state) {
    return null;
  }

  return nextState;
}

class Connect extends React.PureComponent {
  static get getDerivedStateFromProps() {
    return getDerivedStateFromProps;
  }

  state = getDerivedStateFromProps(this.props, {});

  componentDidMount() {
    const updater = getDerivedStateFromProps.bind(null, this.props);

    this.componentWillUnmount = this.props.weakStore.subscribe(() => {
      this.setState(updater);
    });

    this.setState(updater);
  }

  componentDidUpdate(prevProps) {
    if (this.props.to === prevProps.to) return;
    this.componentWillUnmount();
    this.componentDidMount();
  }

  render() {
    return this.props.children(this.state);
  }
}

export default withWeakStore(Connect);
