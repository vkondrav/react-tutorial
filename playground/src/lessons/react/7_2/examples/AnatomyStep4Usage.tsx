// @ts-nocheck
function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return <button onClick={() => dispatch({ type: 'INCREMENT' })}>{state.count}</button>;
}
