// ============================================
// Demo: Tracking Previous Values with useRef
// ============================================

import { useState, useEffect, useRef } from 'react';
import { HiOutlineLightBulb, HiOutlineArrowRight, HiMinus, HiPlus } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import usePreviousHookExample from './examples/UsePreviousHookExample.tsx?raw';

// Custom hook to track previous value using useRef
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // eslint-disable-next-line -- intentional: usePrevious pattern reads ref during render
  return ref.current;
}

export default function PreviousValueDemo(): React.ReactElement {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');

  // Get previous values
  const prevCount = usePrevious(count);
  const prevName = usePrevious(name);

  // Calculate direction for count
  const countDirection =
    prevCount === undefined ? null : count > prevCount ? 'up' : count < prevCount ? 'down' : 'same';

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Tracking Previous Values
      </h3>

      <div className="space-y-4">
        {/* Counter example */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">Number Example</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setCount((c) => c - 1)} className="btn btn-sm btn-circle">
                <HiMinus size={16} />
              </button>
              <div className="text-3xl font-bold text-primary w-12 text-center">{count}</div>
              <button onClick={() => setCount((c) => c + 1)} className="btn btn-sm btn-circle">
                <HiPlus size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-base-content/60">Previous:</span>
              <span className="font-mono text-secondary">{prevCount ?? '—'}</span>
              {countDirection && (
                <span
                  className={`badge badge-sm ${
                    countDirection === 'up'
                      ? 'badge-success'
                      : countDirection === 'down'
                        ? 'badge-error'
                        : 'badge-ghost'
                  }`}
                >
                  {countDirection === 'up' ? '↑' : countDirection === 'down' ? '↓' : '='}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Text example */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">Text Example</div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered input-sm w-40"
            />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-base-content/60">Previous:</span>
              <span className="font-mono text-secondary">"{prevName ?? ''}"</span>
            </div>
          </div>
          {prevName !== undefined && prevName !== name && (
            <div className="mt-2 text-xs text-base-content/60">
              Changed from "{prevName}" <HiOutlineArrowRight className="inline" size={12} /> "{name}
              "
            </div>
          )}
        </div>

        {/* Custom hook code */}
        <div>
          <div className="text-xs font-semibold mb-2">The usePrevious custom hook:</div>
          <CodeSnippet code={usePreviousHookExample} language="tsx" />
        </div>

        {/* How it works */}
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
          <div className="text-xs font-semibold text-primary mb-2">How it works:</div>
          <ol className="text-sm space-y-1 text-base-content/70 list-decimal list-inside">
            <li>
              {/* eslint-disable-next-line local/no-raw-code-element */}
              When <code className="text-secondary">count</code> changes, component re-renders
            </li>
            <li>
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="text-secondary">usePrevious</code> returns{' '}
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="text-secondary">ref.current</code> (still the OLD value)
            </li>
            <li>After render, useEffect updates ref with the NEW value</li>
            <li>Next render will return the current value as "previous"</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
