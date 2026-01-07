// @ts-nocheck
function Counter() {
  const { count } = useAppState();
  const dispatch = useAppDispatch();

  return <button onClick={() => dispatch({ type: 'INCREMENT' })}>Count: {count}</button>;
}

function App() {
  return (
    <AppProvider>
      <Counter />
    </AppProvider>
  );
}
