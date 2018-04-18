import React from "react";

const { Provider, Consumer } = React.createContext({
  getState: () => {},
  setState: () => {},
  subscribe: () => () => {}
});

export { Provider, Consumer };
