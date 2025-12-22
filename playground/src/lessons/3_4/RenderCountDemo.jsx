// ============================================
// Demo: Understanding Re-renders
// ============================================

import { useState } from 'react';
import { HiOutlineLightBulb, HiOutlineRefresh } from 'react-icons/hi';

// Simple counter to track renders (incremented by key changes)
let parentRenderCount = 0;
let child1RenderCount = 0;
let child2RenderCount = 0;

export default function RenderCountDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [renderKey, setRenderKey] = useState(0);

  // Force re-render to update display
  const forceUpdate = () => setRenderKey((k) => k + 1);

  // Increment parent render count
  parentRenderCount++;

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineRefresh className="text-primary" size={20} />
        Watch the Render Counts
      </h3>

      <p className="text-sm text-base-content/70 mb-4">
        Change the count or type text. Notice how <em>both</em> child components re-render even when
        only one value changes — this is the problem we'll solve with memoization.
      </p>

      {/* Parent controls */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="text-xs text-base-content/60 block mb-1">Count State</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCount((c) => c - 1);
                forceUpdate();
              }}
              className="btn btn-sm btn-outline"
            >
              −
            </button>
            <span className="font-mono text-lg w-12 text-center">{count}</span>
            <button
              onClick={() => {
                setCount((c) => c + 1);
                forceUpdate();
              }}
              className="btn btn-sm btn-primary"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs text-base-content/60 block mb-1">Text State</label>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              forceUpdate();
            }}
            placeholder="Type something..."
            className="input input-bordered input-sm w-full"
          />
        </div>
      </div>

      {/* Parent render count */}
      <div className="bg-base-300 rounded-lg p-3 mb-4">
        <div className="text-sm">
          <span className="text-base-content/60">Parent renders:</span>{' '}
          <span className="font-mono text-warning">{parentRenderCount}</span>
        </div>
      </div>

      {/* Child components */}
      <div className="grid grid-cols-2 gap-4 mb-4" key={renderKey}>
        <RegularChild count={count} />
        <RegularChild2 text={text} />
      </div>

      {/* Reset button */}
      <button
        onClick={() => {
          parentRenderCount = 0;
          child1RenderCount = 0;
          child2RenderCount = 0;
          forceUpdate();
        }}
        className="btn btn-ghost btn-sm mb-4"
      >
        Reset Counts
      </button>

      {/* Explanation */}
      <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg border border-warning/30">
        <HiOutlineLightBulb className="text-warning shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-base-content/80">
          <strong>Problem:</strong> Both children re-render when parent re-renders, even if their
          specific prop didn't change. With expensive components, this wastes performance.
        </p>
      </div>
    </div>
  );
}

// Regular child - no memoization
function RegularChild({ count }) {
  child1RenderCount++;

  return (
    <div className="card bg-base-300 p-4">
      <div className="text-xs text-base-content/60 mb-2">CountDisplay (regular)</div>
      <div className="text-2xl font-bold text-primary mb-2">{count}</div>
      <div className="text-xs">
        <span className="text-base-content/60">Renders:</span>{' '}
        <span className="font-mono text-error">{child1RenderCount}</span>
      </div>
    </div>
  );
}

// Another regular child
function RegularChild2({ text }) {
  child2RenderCount++;

  return (
    <div className="card bg-base-300 p-4">
      <div className="text-xs text-base-content/60 mb-2">TextDisplay (regular)</div>
      <div className="text-lg font-mono text-secondary mb-2 truncate">{text || '(empty)'}</div>
      <div className="text-xs">
        <span className="text-base-content/60">Renders:</span>{' '}
        <span className="font-mono text-error">{child2RenderCount}</span>
      </div>
    </div>
  );
}
