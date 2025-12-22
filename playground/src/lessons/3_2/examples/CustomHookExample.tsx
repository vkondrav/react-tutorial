// @ts-nocheck
// Cleaner than useContext(CounterContext)
function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('Must be within Provider');
  }
  return context;
}
