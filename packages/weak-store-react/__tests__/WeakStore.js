import React from "react";
import * as ReactTest from "react-testing-library";
import { createWeakStore, WeakStore } from "weak-store-react";

afterEach(ReactTest.cleanup);

const counter = { state: 0 };

test("swaps store", () => {
  const spy = jest.fn(() => null);

  const { container } = ReactTest.render(
    <WeakStore>
      <WeakStore.Consumer>{spy}</WeakStore.Consumer>
    </WeakStore>
  );

  ReactTest.render(
    <WeakStore value={createWeakStore()}>
      <WeakStore.Consumer>{spy}</WeakStore.Consumer>
    </WeakStore>,
    { container }
  );

  ReactTest.render(
    <WeakStore>
      <WeakStore.Consumer>{spy}</WeakStore.Consumer>
    </WeakStore>,
    { container }
  );

  expect(spy.mock.calls[1][0]).not.toBe(spy.mock.calls[0][0]);
  expect(spy.mock.calls[2][0]).not.toBe(spy.mock.calls[1][0]);
  expect(spy.mock.calls[2][0]).not.toBe(spy.mock.calls[0][0]);
});
