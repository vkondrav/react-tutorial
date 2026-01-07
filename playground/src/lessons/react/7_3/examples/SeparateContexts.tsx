// @ts-nocheck
// Why separate contexts for state and dispatch?

// ❌ Single context - ALL consumers re-render on ANY state change
const AppContext = createContext({ state, dispatch });

function Component() {
  const { dispatch } = useContext(AppContext);
  // This component re-renders even if it only uses dispatch!
  // Because state changed, the context value changed
}

// ✅ Separate contexts - consumers only re-render when their data changes
const StateContext = createContext(state);
const DispatchContext = createContext(dispatch);

function Component() {
  const dispatch = useContext(DispatchContext);
  // dispatch never changes (stable reference)
  // This component won't re-render when state changes!
}

function Display() {
  const state = useContext(StateContext);
  // Only re-renders when state actually changes
}
