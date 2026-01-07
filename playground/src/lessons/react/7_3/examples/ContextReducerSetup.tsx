// @ts-nocheck
// Step 1: Define types
interface State {
  count: number;
  user: string | null;
}

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_USER'; payload: string }
  | { type: 'LOGOUT' };

// Step 2: Create contexts (separate for state and dispatch!)
const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

// Step 3: Create the reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
}

// Step 4: Create provider component
function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    user: null,
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Step 5: Create custom hooks
function useAppState() {
  const context = useContext(StateContext);
  if (!context) throw new Error('useAppState must be used within AppProvider');
  return context;
}

function useAppDispatch() {
  const context = useContext(DispatchContext);
  if (!context) throw new Error('useAppDispatch must be used within AppProvider');
  return context;
}

// Step 6: Use in components!
function Counter() {
  const { count } = useAppState();
  const dispatch = useAppDispatch();

  return <button onClick={() => dispatch({ type: 'INCREMENT' })}>Count: {count}</button>;
}
