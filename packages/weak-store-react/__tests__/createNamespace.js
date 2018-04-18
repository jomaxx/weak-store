import React from "react";
import {
  renderIntoDocument,
  cleanup,
  fireEvent,
  wait
} from "react-testing-library";
import { createWeakStore, WeakStoreProvider, createNamespace } from "../src";

afterEach(cleanup);

test("creates namespace", () => {
  const Namespace = createNamespace();
});

test("renders namespace", () => {
  const weakStore = createWeakStore();
  const Namespace = createNamespace({ state: 1 });
  const spy = jest.fn(() => null);

  renderIntoDocument(
    <WeakStoreProvider value={weakStore}>
      <Namespace>{spy}</Namespace>
    </WeakStoreProvider>
  );

  expect(spy.mock.calls[0][0].state).toBe(1);
});

test("subscribes", async () => {
  const namespace = {};
  const weakStore = createWeakStore();
  const Namespace = createNamespace(namespace);
  const spy = jest.fn(() => null);

  renderIntoDocument(
    <WeakStoreProvider value={weakStore}>
      <Namespace>{spy}</Namespace>
    </WeakStoreProvider>
  );

  weakStore.setState(namespace, 1);

  expect(spy).toHaveBeenCalledTimes(2);
});

test("unsubscribes", async () => {
  const namespace = {};
  const weakStore = createWeakStore();
  const Namespace = createNamespace(namespace);
  const spy = jest.fn(() => null);

  renderIntoDocument(
    <WeakStoreProvider value={weakStore}>
      <Namespace>{spy}</Namespace>
    </WeakStoreProvider>
  ).unmount();

  weakStore.setState(namespace, 1);

  expect(spy).toHaveBeenCalledTimes(1);
});

test("sets state", async () => {
  const weakStore = createWeakStore();
  const Namespace = createNamespace({ state: 1 });
  const spy = jest.fn(namespace => (
    <button onClick={() => namespace.setState(state => state + 1)} />
  ));

  const { container } = renderIntoDocument(
    <WeakStoreProvider value={weakStore}>
      <Namespace>{spy}</Namespace>
    </WeakStoreProvider>
  );

  fireEvent.click(container.querySelector("button"));

  expect(spy.mock.calls[1][0].state).toBe(2);
});
