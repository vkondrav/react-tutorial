// ============================================
// Demo: Context + State Pattern
// ============================================

import { createContext, useContext, useState, ReactNode } from 'react';
import {
  HiOutlineLightBulb,
  HiMinus,
  HiPlus,
  HiOutlineRefresh,
  HiOutlineCode,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';
import { CodeSnippet } from '@components';
import providerPatternExample from './examples/ProviderPatternExample.tsx?raw';
import customHookExample from './examples/CustomHookExample.tsx?raw';
import consumerExample from './examples/ConsumerExample.tsx?raw';

// Types
interface CounterContextValue {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

interface CounterProviderProps {
  children: ReactNode;
}

// Create context that will hold BOTH state and updater
const CounterContext = createContext<CounterContextValue | null>(null);

// Custom hook for cleaner consumption (common pattern!)
function useCounter(): CounterContextValue {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider');
  }
  return context;
}

// Provider component that wraps useState
function CounterProvider({ children }: CounterProviderProps): React.ReactElement {
  const [count, setCount] = useState(0);

  // Provide both state and actions
  const value: CounterContextValue = {
    count,
    increment: () => setCount((c) => c + 1),
    decrement: () => setCount((c) => c - 1),
    reset: () => setCount(0),
  };

  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>;
}

// Consumer components - they can read AND update!
function DisplayCount(): React.ReactElement {
  const { count } = useCounter();

  return (
    <div className="card bg-base-300 p-4 text-center">
      <div className="text-xs text-base-content/60 mb-1">DisplayCount Component</div>
      <div className="text-4xl font-bold text-primary">{count}</div>
    </div>
  );
}

function IncrementButton(): React.ReactElement {
  const { increment } = useCounter();

  return (
    <button onClick={increment} className="btn btn-success btn-sm gap-1">
      <HiPlus size={16} />
      Increment
    </button>
  );
}

function DecrementButton(): React.ReactElement {
  const { decrement } = useCounter();

  return (
    <button onClick={decrement} className="btn btn-error btn-sm gap-1">
      <HiMinus size={16} />
      Decrement
    </button>
  );
}

function ResetButton(): React.ReactElement {
  const { reset, count } = useCounter();

  return (
    <button onClick={reset} disabled={count === 0} className="btn btn-ghost btn-sm gap-1">
      <HiOutlineRefresh size={16} />
      Reset
    </button>
  );
}

function ControlPanel(): React.ReactElement {
  return (
    <div className="card bg-base-300 p-4">
      <div className="text-xs text-base-content/60 mb-3">ControlPanel Component</div>
      <div className="flex gap-2 justify-center flex-wrap">
        <DecrementButton />
        <IncrementButton />
        <ResetButton />
      </div>
    </div>
  );
}

export default function ContextWithStateDemo(): React.ReactElement {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="card bg-base-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <HiOutlineLightBulb className="text-primary" size={20} />
          Shared Counter with Context
        </h3>
        <button onClick={() => setShowCode(!showCode)} className="btn btn-xs btn-ghost gap-1">
          <HiOutlineCode size={14} />
          {showCode ? 'Hide' : 'Show'} Pattern
          {showCode ? <HiChevronDown size={14} /> : <HiChevronRight size={14} />}
        </button>
      </div>

      {/* Interactive demo */}
      <CounterProvider>
        <div className="space-y-3 mb-4">
          <div className="border border-primary/30 rounded-lg p-3 bg-primary/5">
            <div className="text-xs text-primary font-semibold mb-3">
              CounterProvider (state lives here)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DisplayCount />
              <ControlPanel />
            </div>
          </div>
        </div>
      </CounterProvider>

      {/* Explanation */}
      <div className="p-3 rounded-lg bg-success/10 border border-success/30 mb-4">
        <div className="flex items-start gap-2">
          <HiOutlineLightBulb className="text-success shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-base-content/70">
            <strong className="text-success">Key Pattern:</strong> The Provider holds the state. Any
            child component can both <strong>read</strong> and <strong>update</strong> it using the
            {/* eslint-disable-next-line local/no-raw-code-element */}
            custom <code className="text-secondary">useCounter()</code> hook.
          </div>
        </div>
      </div>

      {/* Code pattern */}
      {showCode && (
        <div className="space-y-3">
          <div>
            <div className="text-xs font-semibold text-primary mb-2">The Provider Pattern</div>
            <CodeSnippet code={providerPatternExample} language="tsx" />
          </div>

          <div>
            <div className="text-xs font-semibold text-secondary mb-2">
              Custom Hook (Best Practice!)
            </div>
            <CodeSnippet code={customHookExample} language="tsx" />
          </div>

          <div>
            <div className="text-xs font-semibold text-success mb-2">Consumer Components</div>
            <CodeSnippet code={consumerExample} language="tsx" />
          </div>
        </div>
      )}
    </div>
  );
}
