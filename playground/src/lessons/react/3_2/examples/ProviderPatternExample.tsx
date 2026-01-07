// @ts-nocheck
function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  // Bundle state + actions together
  const value = {
    count,
    increment: () => setCount((c) => c + 1),
    decrement: () => setCount((c) => c - 1),
    reset: () => setCount(0),
  };

  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>;
}
