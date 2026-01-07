// ============================================
// StateBasicsDemo - Introduction to useState
// ============================================

import { useState } from 'react';
import { HiMinus, HiPlus, HiChevronDown, HiChevronRight, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import counterExample from './examples/CounterExample.tsx?raw';

// ============================================
// Main Component
// ============================================

export default function StateBasicsDemo(): React.ReactElement {
  const [count, setCount] = useState<number>(0);
  const [showCode, setShowCode] = useState<boolean>(true);

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Live Demo */}
      <div className="p-8 flex flex-col items-center gap-6 border-b border-base-300">
        <div className="text-xs text-base-content/50 uppercase">Live Counter Example</div>
        <div className="text-7xl font-bold text-base-content font-mono">{count}</div>
        <div className="flex gap-3">
          <button onClick={() => setCount(count - 1)} className="btn btn-error btn-lg">
            <HiMinus size={24} />
          </button>
          <button onClick={() => setCount(0)} className="btn btn-ghost btn-sm">
            Reset
          </button>
          <button onClick={() => setCount(count + 1)} className="btn btn-success btn-lg">
            <HiPlus size={24} />
          </button>
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="w-full px-4 py-3 bg-base-300 border-none border-b border-base-300 text-base-content/70 cursor-pointer text-sm hover:bg-base-200 transition-colors flex items-center justify-center gap-2"
      >
        {showCode ? (
          <>
            <HiChevronDown size={16} />
            Hide Code
          </>
        ) : (
          <>
            <HiChevronRight size={16} />
            Show Code
          </>
        )}
      </button>

      {/* Code Explanation */}
      {showCode && (
        <div className="p-6">
          <CodeSnippet code={counterExample} language="tsx" showCopy={false} />

          {/* Anatomy */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="card bg-base-300 p-4 border-t-4 border-warning">
              <div className="text-warning font-semibold mb-2">count</div>
              <div className="text-base-content/70 text-sm">
                The current state value. Use this to display data.
              </div>
            </div>
            <div className="card bg-base-300 p-4 border-t-4 border-accent">
              <div className="text-accent font-semibold mb-2">setCount</div>
              <div className="text-base-content/70 text-sm">
                Function to update state. Calling it triggers a re-render.
              </div>
            </div>
            <div className="card bg-base-300 p-4 border-t-4 border-primary">
              <div className="text-primary font-semibold mb-2">useState(0)</div>
              <div className="text-base-content/70 text-sm">
                The hook call. 0 is the initial value (only used on first render).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key insight */}
      <div className="px-6 py-4 bg-success/10 border-t border-success flex items-center gap-3">
        <HiOutlineLightBulb className="text-success" size={20} />
        <span className="text-base-content/70 text-sm">
          Every time you call <code className="text-accent">setCount</code>, React re-renders the
          component with the new value. Try clicking the buttons!
        </span>
      </div>
    </div>
  );
}
