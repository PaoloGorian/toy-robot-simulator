export function newState<S>(state: S, newData: Partial<S>) {
  return Object.assign({}, state, newData);
}
