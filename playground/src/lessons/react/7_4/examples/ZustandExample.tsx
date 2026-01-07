// @ts-nocheck
import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Usage - no Provider needed!
function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}
