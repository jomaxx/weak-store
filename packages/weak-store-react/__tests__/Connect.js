import React from "react";
import * as ReactTest from "react-testing-library";
import { createWeakStore, WeakStore, Connect } from "../src";

afterEach(ReactTest.cleanup);

const counter = { state: 0 };

test("connects to namespace", () => {
  const spy = jest.fn(() => null);

  ReactTest.renderIntoDocument(
    <WeakStore>
      <Connect to={counter}>{spy}</Connect>
    </WeakStore>
  );

  expect(spy.mock.calls[0][0].state).toBe(0);
  expect(spy).toHaveBeenCalledTimes(1);
});

test("subscribes", async () => {
  const weakStore = createWeakStore();
  const spy = jest.fn(() => null);

  ReactTest.renderIntoDocument(
    <WeakStore value={weakStore}>
      <Connect to={counter}>{spy}</Connect>
    </WeakStore>
  );

  weakStore.setState(counter, 1);

  expect(spy.mock.calls[1][0].state).toBe(1);
  expect(spy).toHaveBeenCalledTimes(2);
});

test("unsubscribes", async () => {
  const weakStore = createWeakStore();
  const spy = jest.fn(() => null);

  ReactTest.renderIntoDocument(
    <WeakStore value={weakStore}>
      <Connect to={counter}>{spy}</Connect>
    </WeakStore>
  ).unmount();

  weakStore.setState(counter, 1);

  expect(spy.mock.calls[0][0].state).toBe(0);
  expect(spy).toHaveBeenCalledTimes(1);
});

test("sets state", async () => {
  const weakStore = createWeakStore();
  const button = React.createRef();
  const spy = jest.fn(namespace => (
    <button
      onClick={() => namespace.setState(state => state + 1)}
      ref={button}
    />
  ));

  ReactTest.renderIntoDocument(
    <WeakStore value={weakStore}>
      <Connect to={counter}>{spy}</Connect>
    </WeakStore>
  );

  ReactTest.fireEvent.click(button.current);

  expect(spy.mock.calls[1][0].state).toBe(1);
  expect(spy).toHaveBeenCalledTimes(2);
});
