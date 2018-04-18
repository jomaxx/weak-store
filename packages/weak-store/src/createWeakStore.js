export default function createWeakStore() {
  const namespaces = new WeakMap();
  const listeners = [];
  let timeout;

  function getState(namespace) {
    // initialize namespace
    if (!namespaces.has(namespace)) {
      namespaces.set(namespace, namespace.state);
    }

    return namespaces.get(namespace);
  }

  function setState(namespace, nextState) {
    namespaces.set(
      namespace,
      typeof nextState === "function"
        ? nextState(getState(namespace))
        : nextState
    );

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
