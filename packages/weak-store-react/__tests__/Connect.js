import React from "react";
import * as ReactTest from "react-testing-library";
import { createWeakStore, WeakStore, Connect } from "../src";

afterEach(ReactTest.cleanup);

const counter = { state: 0 };

test("has initial state", () => {
  const spy = jest.fn(() => null);

  ReactTest.render(
    <WeakStore>
      <Connect to={counter}>{spy}</Connect>
    </WeakStore>
  );

  expect(spy.mock.calls[0][0].state).toBe(0);
  expect(spy).toHaveBeenCalledTimes(1);
});

test("subscribes", async () => {
  const spy = jest.fn(() => null);

  ReactTest.render(
    <WeakStore>
      <Connect to={counter}>{spy}</Connect>
    </WeakStore>
  );

  spy.mock.calls[0][0].setState(1);

  expect(spy.mock.calls[1][0].state).toBe(1);
  expect(spy).toHaveBeenCalledTimes(2);
});

test("unsubscribes", async () => {
  const spy = jest.fn(() => null);

  ReactTest.render(
    <WeakStore>
      <Connect to={counter}>{spy}</Connect>
    </WeakStore>
  ).unmount();

  spy.mock.calls[0][0].setState(1);

  expect(spy.mock.calls[0][0].state).toBe(0);
  expect(spy).toHaveBeenCalledTimes(1);
});

test("sets state", async () => {
  const spy = jest.fn(() => null);

  ReactTest.render(
    <WeakStore>
      <Connect to={counter}>{spy}</Connect>
    </WeakStore>
  );

  spy.mock.calls[0][0].setState(1);

  expect(spy.mock.calls[1][0].state).toBe(1);
  expect(spy).toHaveBeenCalledTimes(2);
});

test("swaps weakStore", () => {
  const spy = jest.fn(() => null);

  const { container } = ReactTest.render(
    <WeakStore>
      <Connect to={counter}>{spy}</Connect>
    </WeakStore>
  );

  ReactTest.render(
    <WeakStore value={createWeakStore()}>
      <Connect to={counter}>{spy}</Connect>
    </WeakStore>,
    { container }
  );

  spy.mock.calls[0][0].setState(1);
  spy.mock.calls[1][0].setState(2);

  expect(spy.mock.calls[0][0].state).toBe(0);
  expect(spy.mock.calls[1][0].state).toBe(0);
  expect(spy.mock.calls[2][0].state).toBe(2);
  expect(spy).toHaveBeenCalledTimes(3);
});
