// ============================================
// Demo: Context + State Pattern
// ============================================

import { createContext, useContext, useState } from 'react';
import {
  HiOutlineLightBulb,
  HiMinus,
  HiPlus,
  HiOutlineRefresh,
  HiOutlineCode,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';

// Create context that will hold BOTH state and updater
const CounterContext = createContext(null);

// Custom hook for cleaner consumption (common pattern!)
function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider');
  }
  return context;
}

// Provider component that wraps useState
function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  // Provide both state and actions
  const value = {
    count,
    increment: () => setCount((c) => c + 1),
    decrement: () => setCount((c) => c - 1),
    reset: () => setCount(0),
  };

  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>;
}

// Consumer components - they can read AND update!
function DisplayCount() {
  const { count } = useCounter();

  return (
    <div className="card bg-base-300 p-4 text-center">
      <div className="text-xs text-base-content/60 mb-1">DisplayCount Component</div>
      <div className="text-4xl font-bold text-primary">{count}</div>
    </div>
  );
}

function IncrementButton() {
  const { increment } = useCounter();

  return (
    <button onClick={increment} className="btn btn-success btn-sm gap-1">
      <HiPlus size={16} />
      Increment
    </button>
  );
}

function DecrementButton() {
  const { decrement } = useCounter();

  return (
    <button onClick={decrement} className="btn btn-error btn-sm gap-1">
      <HiMinus size={16} />
      Decrement
    </button>
  );
}

function ResetButton() {
  const { reset, count } = useCounter();

  return (
    <button onClick={reset} disabled={count === 0} className="btn btn-ghost btn-sm gap-1">
      <HiOutlineRefresh size={16} />
      Reset
    </button>
  );
}

function ControlPanel() {
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

export default function ContextWithStateDemo() {
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
            custom <code className="text-secondary">useCounter()</code> hook.
          </div>
        </div>
      </div>

      {/* Code pattern */}
      {showCode && (
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-base-300">
            <div className="text-xs font-semibold text-primary mb-2">The Provider Pattern</div>
            <pre className="font-mono text-xs overflow-x-auto">
              <code>
                <span className="text-secondary">function</span>{' '}
                <span className="text-primary">CounterProvider</span>
                {'({ children }) {'}
                {'\n'}
                {'  '}
                <span className="text-secondary">const</span>
                {' [count, setCount] = '}
                <span className="text-primary">useState</span>
                {'(0);'}
                {'\n\n'}
                {'  '}
                <span className="text-base-content/60">// Bundle state + actions together</span>
                {'\n'}
                {'  '}
                <span className="text-secondary">const</span>
                {' value = {'}
                {'\n'}
                {'    count,'}
                {'\n'}
                {'    increment: () => setCount(c => c + 1),'}
                {'\n'}
                {'    decrement: () => setCount(c => c - 1),'}
                {'\n'}
                {'    reset: () => setCount(0),'}
                {'\n'}
                {'  };'}
                {'\n\n'}
                {'  '}
                <span className="text-secondary">return</span>
                {' ('}
                {'\n'}
                {'    <'}
                <span className="text-accent">CounterContext.Provider</span>{' '}
                <span className="text-warning">value</span>
                {'={value}>'}
                {'\n'}
                {'      {children}'}
                {'\n'}
                {'    </'}
                <span className="text-accent">CounterContext.Provider</span>
                {'>'}
                {'\n'}
                {'  );'}
                {'\n'}
                {'}'}
              </code>
            </pre>
          </div>

          <div className="p-3 rounded-lg bg-base-300">
            <div className="text-xs font-semibold text-secondary mb-2">
              Custom Hook (Best Practice!)
            </div>
            <pre className="font-mono text-xs overflow-x-auto">
              <code>
                <span className="text-base-content/60">
                  // Cleaner than useContext(CounterContext)
                </span>
                {'\n'}
                <span className="text-secondary">function</span>{' '}
                <span className="text-primary">useCounter</span>
                {'() {'}
                {'\n'}
                {'  '}
                <span className="text-secondary">const</span>
                {' context = '}
                <span className="text-primary">useContext</span>
                {'(CounterContext);'}
                {'\n'}
                {'  '}
                <span className="text-secondary">if</span>
                {' (!context) {'}
                {'\n'}
                {'    '}
                <span className="text-secondary">throw new</span>{' '}
                <span className="text-error">Error</span>
                {'('}
                <span className="text-success">'Must be within Provider'</span>
                {');'}
                {'\n'}
                {'  }'}
                {'\n'}
                {'  '}
                <span className="text-secondary">return</span>
                {' context;'}
                {'\n'}
                {'}'}
              </code>
            </pre>
          </div>

          <div className="p-3 rounded-lg bg-base-300">
            <div className="text-xs font-semibold text-success mb-2">Consumer Components</div>
            <pre className="font-mono text-xs overflow-x-auto">
              <code>
                <span className="text-secondary">function</span>{' '}
                <span className="text-primary">DisplayCount</span>
                {'() {'}
                {'\n'}
                {'  '}
                <span className="text-secondary">const</span>
                {' { count } = '}
                <span className="text-primary">useCounter</span>
                {'();'}
                {'\n'}
                {'  '}
                <span className="text-secondary">return</span>
                {' <div>{count}</div>;'}
                {'\n'}
                {'}'}
                {'\n\n'}
                <span className="text-secondary">function</span>{' '}
                <span className="text-primary">IncrementButton</span>
                {'() {'}
                {'\n'}
                {'  '}
                <span className="text-secondary">const</span>
                {' { increment } = '}
                <span className="text-primary">useCounter</span>
                {'();'}
                {'\n'}
                {'  '}
                <span className="text-secondary">return</span>
                {' <button onClick={increment}>+</button>;'}
                {'\n'}
                {'}'}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
