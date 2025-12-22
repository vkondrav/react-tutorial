// @ts-nocheck
// The useReducer hook anatomy

// 1. Define the state type
interface State {
  count: number;
}

// 2. Define action types (discriminated union)
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'SET'; payload: number };

// 3. Create the reducer function (pure!)
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'SET':
      return { count: action.payload };
    default:
      return state; // Always return state for unknown actions
  }
}

// 4. Use in component
function Counter() {
  const initialState: State = { count: 0 };

  // useReducer returns [state, dispatch]
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>−</button>
      <button onClick={() => dispatch({ type: 'SET', payload: 0 })}>Reset</button>
    </div>
  );
}
