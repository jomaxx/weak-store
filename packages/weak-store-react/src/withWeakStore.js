import React from "react";
import Context from "./Context";

export default function withWeakStore(C) {
  function WithWeakStore(props) {
    return (
      <Context.Consumer>
        {weakStore => <C weakStore={weakStore} {...props} />}
      </Context.Consumer>
    );
  }

  WithWeakStore.displayName = `withWeakStore(${C.displayName ||
    C.name ||
    "Component"})`;

  return WithWeakStore;
}
