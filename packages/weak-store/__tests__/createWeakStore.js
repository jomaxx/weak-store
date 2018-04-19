import { createWeakStore } from "weak-store";

const counterKey = {
  state: { value: 0 }
};

test("get intitial state", () => {
  const store = createWeakStore();
  expect(store.getState(counterKey)).toEqual({ value: 0 });
});

test("sets state", () => {
  const store = createWeakStore();
  store.setState(counterKey, { value: 1 });
  expect(store.getState(counterKey)).toEqual({ value: 1 });
});

test("sets state (function)", () => {
  const store = createWeakStore();
  store.setState(counterKey, state => ({ value: state.value + 1 }));
  expect(store.getState(counterKey)).toEqual({ value: 1 });
});

test("has unique namespaces", () => {
  const store = createWeakStore();
  const counterKey2 = { ...counterKey };
  store.setState(counterKey, { value: 1 });
  expect(store.getState(counterKey)).not.toEqual(store.getState(counterKey2));
});

test("notify subscribers async", () => {
  const store = createWeakStore();
  const listener = jest.fn();
  store.subscribe(listener);
  store.setState(counterKey, { value: 1 });
  expect(listener).toHaveBeenCalledTimes(1);
});

test("doesn't notify if nextState is null", () => {
  const store = createWeakStore();
  const listener = jest.fn();
  store.subscribe(listener);
  store.setState(counterKey, null);
  store.setState(counterKey, () => null);
  expect(listener).toHaveBeenCalledTimes(0);
});

test("unsubscribes", () => {
  const store = createWeakStore();
  const listener = jest.fn();
  store.subscribe(listener)();
  store.setState(counterKey, { value: 1 });
  expect(listener).toHaveBeenCalledTimes(0);
});

test("unsubscribes once", () => {
  const store = createWeakStore();
  const listener = jest.fn();
  store.subscribe(listener);
  const unsubscribe = store.subscribe(listener);
  unsubscribe();
  unsubscribe();
  store.setState(counterKey, { value: 1 });
  expect(listener).toHaveBeenCalledTimes(1);
});
