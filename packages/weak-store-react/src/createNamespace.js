import React from "react";
import { Consumer } from "./Context";

export default function createNamespace(namespace = {}) {
  class Namespace extends React.PureComponent {
    state = {
      state: this.props.store.getState(namespace),
      setState: this.props.store.setState.bind(null, namespace)
    };

    componentDidMount() {
      const store = this.props.store;

      const update = () => {
        this.setState(prevState => {
          const state = store.getState(namespace);
          return state === prevState ? null : { state };
        });
      };

      this.componentWillUnmount = this.props.store.subscribe(update);

      update();
    }

    render() {
      return this.props.children(this.state);
    }
  }

  function WeakStore(props) {
    return (
      <Consumer>{store => <Namespace store={store} {...props} />}</Consumer>
    );
  }

  return WeakStore;
}
