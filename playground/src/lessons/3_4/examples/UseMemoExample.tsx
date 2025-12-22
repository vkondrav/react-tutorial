// @ts-nocheck
const expensiveResult = useMemo(() => {
  // Heavy calculation here
  return computeExpensiveValue(data);
}, [data]); // Only recalculate when data changes
