// @ts-nocheck
// ✅ Render prop - consumer decides the UI
interface CounterProps {
  render: (count: number, increment: () => void) => ReactNode;
}

function Counter({ render }: CounterProps) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);

  // Call the render function with state and handlers
  return <>{render(count, increment)}</>;
}

// Usage - YOU decide how it looks!
<Counter
  render={(count, increment) => (
    <div>
      <span>Count: {count}</span>
      <button onClick={increment}>+1</button>
    </div>
  )}
/>;
