// ============================================
// Demo: useCallback with React.memo
// ============================================

import { useState, useCallback, memo } from 'react';
import { HiOutlineLightBulb, HiPlus, HiMinus } from 'react-icons/hi';

// Module-level render counters for buttons
let incrementRenderCount = 0;
let decrementRenderCount = 0;

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(false);
  const [, forceUpdate] = useState(0);

  // Without useCallback - new function every render
  const incrementWithout = () => setCount((c) => c + 1);
  const decrementWithout = () => setCount((c) => c - 1);

  // With useCallback - same function reference
  const incrementWith = useCallback(() => setCount((c) => c + 1), []);
  const decrementWith = useCallback(() => setCount((c) => c - 1), []);

  const increment = useCallbackEnabled ? incrementWith : incrementWithout;
  const decrement = useCallbackEnabled ? decrementWith : decrementWithout;

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiPlus className="text-primary" size={20} />
        useCallback + React.memo Demo
      </h3>

      <p className="text-sm text-base-content/70 mb-4">
        The button components are wrapped in <code className="text-secondary">React.memo</code>.
        Without <code className="text-secondary">useCallback</code>, they re-render because the
        function prop is a new reference every time.
      </p>

      {/* Toggle */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setUseCallbackEnabled((u) => !u)}
          className={`btn btn-sm ${useCallbackEnabled ? 'btn-success' : 'btn-error'}`}
        >
          {useCallbackEnabled ? '✓ useCallback ON' : '✗ useCallback OFF'}
        </button>
        <button
          onClick={() => {
            setOtherState((o) => o + 1);
            forceUpdate((n) => n + 1);
          }}
          className="btn btn-sm btn-outline"
        >
          Update Other State ({otherState})
        </button>
        <button
          onClick={() => {
            incrementRenderCount = 0;
            decrementRenderCount = 0;
            forceUpdate((n) => n + 1);
          }}
          className="btn btn-sm btn-ghost"
        >
          Reset Counts
        </button>
      </div>

      {/* Counter display */}
      <div className="bg-base-300 rounded-lg p-4 mb-4">
        <div className="text-center">
          <div className="text-xs text-base-content/60 mb-1">Count</div>
          <div className="text-4xl font-bold text-primary">{count}</div>
        </div>
      </div>

      {/* Memoized buttons */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <DecrementButton onClick={decrement} />
        <IncrementButton onClick={increment} />
      </div>

      {/* Code comparison */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="card bg-error/10 border border-error/30 p-3">
          <div className="text-xs font-semibold text-error mb-2">Without useCallback</div>
          <pre className="font-mono text-xs overflow-x-auto">
            <code>
              {`const increment = () => {
  setCount(c => c + 1);
};
// New function every render!`}
            </code>
          </pre>
        </div>
        <div className="card bg-success/10 border border-success/30 p-3">
          <div className="text-xs font-semibold text-success mb-2">With useCallback</div>
          <pre className="font-mono text-xs overflow-x-auto">
            <code>
              {`const increment = useCallback(
  () => setCount(c => c + 1),
  []
);
// Same function reference`}
            </code>
          </pre>
        </div>
      </div>

      {/* Explanation */}
      <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg border border-primary/30">
        <HiOutlineLightBulb className="text-primary shrink-0 mt-0.5" size={18} />
        <div className="text-sm text-base-content/80">
          <strong>Try this:</strong> Click "Update Other State" and watch the button render counts.
          With useCallback OFF, both buttons re-render. With useCallback ON, they stay at the same
          count!
        </div>
      </div>
    </div>
  );
}

// Memoized decrement button
const DecrementButton = memo(function DecrementButton({ onClick }) {
  decrementRenderCount++;

  return (
    <div className="card bg-base-300 p-4">
      <button onClick={onClick} className="btn btn-error w-full mb-2">
        <HiMinus size={20} />
        Decrement
      </button>
      <div className="text-xs text-center">
        <span className="text-base-content/60">Renders:</span>{' '}
        <span className={`font-mono ${decrementRenderCount > 1 ? 'text-warning' : 'text-success'}`}>
          {decrementRenderCount}
        </span>
      </div>
    </div>
  );
});

// Memoized increment button
const IncrementButton = memo(function IncrementButton({ onClick }) {
  incrementRenderCount++;

  return (
    <div className="card bg-base-300 p-4">
      <button onClick={onClick} className="btn btn-success w-full mb-2">
        <HiPlus size={20} />
        Increment
      </button>
      <div className="text-xs text-center">
        <span className="text-base-content/60">Renders:</span>{' '}
        <span className={`font-mono ${incrementRenderCount > 1 ? 'text-warning' : 'text-success'}`}>
          {incrementRenderCount}
        </span>
      </div>
    </div>
  );
});
