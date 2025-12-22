// @ts-nocheck
// ❌ Hardcoded rendering - not flexible
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <p>{count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

// Usage - stuck with this one design
<Counter />;
