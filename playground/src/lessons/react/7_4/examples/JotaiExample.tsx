// @ts-nocheck
import { atom, useAtom } from 'jotai';

// Define atoms (like useState but global)
const countAtom = atom(0);
const doubledAtom = atom((get) => get(countAtom) * 2);

// Usage - components only re-render when their atoms change
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}

function DoubleDisplay() {
  const [doubled] = useAtom(doubledAtom);
  return <div>Doubled: {doubled}</div>;
}
