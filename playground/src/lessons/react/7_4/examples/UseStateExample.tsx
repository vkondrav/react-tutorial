// @ts-nocheck
// useState - Perfect for component-local state
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}

// Multiple related values? Still works great!
function Form() {
  const [form, setForm] = useState({ name: '', email: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // ...
}
