import React from "react";
import * as module from "../src";

test("has exports", () => {
  expect(module).toMatchSnapshot();
});
