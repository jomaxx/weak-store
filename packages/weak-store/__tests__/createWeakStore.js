import { createWeakStore } from "weak-store";

test("creates store", () => {
  const store = createWeakStore();
});

test("get intitial state", () => {
  const store = createWeakStore();
  const namespace = { state: 1 };
  expect(store.getState(namespace)).toBe(namespace.state);
});

test("sets state", () => {
  const store = createWeakStore();
  const namespace = { state: 1 };
  store.setState(namespace, 2);
  expect(store.getState(namespace)).toBe(2);
});

test("has unique namespaces", () => {
  const store = createWeakStore();
  const namespace = { state: {} };
  const namespace2 = { state: namespace.state };
  store.setState(namespace, {});
  expect(store.getState(namespace)).not.toBe(store.getState(namespace2));
});

test("notify subscribers async", () => {
  const store = createWeakStore();
  const listener = jest.fn();
  store.subscribe(listener);
  const namespace = { state: {} };
  store.setState(namespace, {});
  expect(listener).toHaveBeenCalledTimes(1);
});

test("unsubscribes", () => {
  const store = createWeakStore();
  const listener = jest.fn();
  store.subscribe(listener)();
  const namespace = { state: {} };
  store.setState(namespace, {});
  expect(listener).toHaveBeenCalledTimes(0);
});
