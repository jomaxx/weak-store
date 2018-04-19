import React from "react";
import * as module from "weak-store-react";

test("has exports", () => {
  expect(module).toMatchSnapshot();
});
