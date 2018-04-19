import React from "react";
import Context from "./Context";

function getDerivedStateFromProps(nextProps, prevState) {
  const nextState = {
    to: nextProps.to,
    state: nextProps.store.getState(nextProps.to),
    setState: nextProps.store.setState.bind(null, nextProps.to)
  };

  return nextState.to === prevState.to && nextState.state === prevState.state
    ? null
    : nextState;
}

class Connect extends React.PureComponent {
  static get getDerivedStateFromProps() {
    return getDerivedStateFromProps;
  }

  state = getDerivedStateFromProps(this.props, {});

  componentDidMount() {
    const updater = getDerivedStateFromProps.bind(null, this.props);

    this.componentWillUnmount = this.props.store.subscribe(() => {
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

export default function ConnectWrapper(props) {
  return (
    <Context.Consumer>
      {store => <Connect store={store} {...props} />}
    </Context.Consumer>
  );
}
