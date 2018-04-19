import React from "react";

export default React.createContext({
  getState: namespace => namespace.state,
  setState: () => {},
  subscribe: () => () => {}
});
