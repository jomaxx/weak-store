import React from "react";
import WeakStore from "./WeakStore";

export default function withWeakStore(C) {
  function WithWeakStore(props) {
    return (
      <WeakStore.Consumer>
        {weakStore => <C weakStore={weakStore} {...props} />}
      </WeakStore.Consumer>
    );
  }

  WithWeakStore.displayName = `withWeakStore(${C.displayName ||
    C.name ||
    "Component"})`;

  return WithWeakStore;
}
