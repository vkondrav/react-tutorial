// ============================================
// Demo: Custom Hook Basics
// ============================================

import { useState } from 'react';
import { HiOutlineLightBulb, HiPlus, HiMinus } from 'react-icons/hi';

// ============================================
// Types
// ============================================
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

interface CounterCardProps {
  title: string;
  subtitle: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

// ============================================
// Custom Hook: useCounter
// ============================================
function useCounter(initialValue: number = 0, step: number = 1): UseCounterReturn {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

export default function CustomHookBasicsDemo(): React.ReactElement {
  // Using the custom hook - each component gets its own state!
  const counter1 = useCounter(0, 1);
  const counter2 = useCounter(10, 5);

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        useCounter Hook in Action
      </h3>

      <p className="text-sm text-base-content/70 mb-4">
        Each call to <code className="text-secondary">useCounter</code> creates independent state.
        Counter 1 steps by 1, Counter 2 steps by 5.
      </p>

      {/* Two counters using the same hook */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <CounterCard
          title="Counter 1"
          subtitle="step: 1"
          count={counter1.count}
          onIncrement={counter1.increment}
          onDecrement={counter1.decrement}
          onReset={counter1.reset}
        />
        <CounterCard
          title="Counter 2"
          subtitle="step: 5"
          count={counter2.count}
          onIncrement={counter2.increment}
          onDecrement={counter2.decrement}
          onReset={counter2.reset}
        />
      </div>

      {/* The hook code */}
      <div className="bg-base-300 rounded-lg p-4">
        <div className="text-xs font-semibold text-primary mb-2">The Custom Hook (TypeScript)</div>
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            {`interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

function useCounter(initialValue: number = 0, step: number = 1): UseCounterReturn {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}

// Helper component for counter display
function CounterCard({
  title,
  subtitle,
  count,
  onIncrement,
  onDecrement,
  onReset,
}: CounterCardProps): React.ReactElement {
  return (
    <div className="card bg-base-300 p-4">
      <div className="text-xs text-base-content/60 mb-1">{title}</div>
      <div className="text-xs text-base-content/40 mb-2">{subtitle}</div>
      <div className="text-3xl font-bold text-primary text-center mb-3">{count}</div>
      <div className="flex gap-2">
        <button onClick={onDecrement} className="btn btn-sm btn-outline flex-1">
          <HiMinus size={16} />
        </button>
        <button onClick={onReset} className="btn btn-sm btn-ghost">
          Reset
        </button>
        <button onClick={onIncrement} className="btn btn-sm btn-primary flex-1">
          <HiPlus size={16} />
        </button>
      </div>
    </div>
  );
}

