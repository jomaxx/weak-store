export default function createWeakStore() {
  const state = new WeakMap();
  const listeners = [];

  function getState(key) {
    // initialize key
    if (!state.has(key)) state.set(key, key.state);
    return state.get(key);
  }

  function setState(key, updater) {
    const prevState = getState(key);
    const nextState =
      typeof updater === "function" ? updater(prevState) : updater;
    if (nextState === null) return;
    state.set(key, Object.assign({}, prevState, nextState));
    listeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);

    let unsubscribed = false;

    function unsubscribe() {
      if (unsubscribed) return;
      unsubscribed = true;
      listeners.splice(listeners.indexOf(listener), 1);
    }

    return unsubscribe;
  }

  return { getState, setState, subscribe };
}
