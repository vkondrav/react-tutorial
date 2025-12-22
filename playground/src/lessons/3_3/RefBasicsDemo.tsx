// ============================================
// Demo: useRef Basics - Comparing with useState
// ============================================

import { useState, useRef } from 'react';
import { HiOutlineLightBulb, HiPlus, HiOutlineRefresh } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import useStateVsRefExample from './examples/UseStateVsRefExample.tsx?raw';

export default function RefBasicsDemo(): React.ReactElement {
  // State: causes re-render
  const [stateCount, setStateCount] = useState(0);

  // Ref: does NOT cause re-render
  const refCount = useRef(0);

  // State to display ref value (updated only on re-render)
  const [displayedRefValue, setDisplayedRefValue] = useState(0);

  // Force re-render and show current ref value
  const forceRerender = (): void => {
    setDisplayedRefValue(refCount.current);
  };

  return (
    <div className="card bg-base-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <HiOutlineLightBulb className="text-primary" size={20} />
        <h3 className="font-semibold">useState vs useRef</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* useState column */}
        <div className="card bg-primary/10 border border-primary/30 p-4">
          <div className="text-xs text-primary font-semibold mb-2">useState</div>
          <div className="text-3xl font-bold text-primary mb-3">{stateCount}</div>
          <button
            onClick={() => setStateCount((c) => c + 1)}
            className="btn btn-primary btn-sm gap-1"
          >
            <HiPlus size={16} />
            Increment State
          </button>
          <p className="text-xs text-base-content/60 mt-2">
            Click updates UI immediately because state change triggers re-render.
          </p>
        </div>

        {/* useRef column */}
        <div className="card bg-secondary/10 border border-secondary/30 p-4">
          <div className="text-xs text-secondary font-semibold mb-2">useRef</div>
          <div className="text-3xl font-bold text-secondary mb-3">{displayedRefValue}</div>
          <button
            onClick={() => {
              refCount.current++;
              console.log('Ref value:', refCount.current);
            }}
            className="btn btn-secondary btn-sm gap-1"
          >
            <HiPlus size={16} />
            Increment Ref
          </button>
          <p className="text-xs text-base-content/60 mt-2">
            Click updates the ref but UI doesn't change! Check console.
          </p>
        </div>
      </div>

      {/* Force re-render button */}
      <button onClick={forceRerender} className="btn btn-ghost btn-sm gap-1 w-full">
        <HiOutlineRefresh size={16} />
        Force Re-render (to see ref value)
      </button>

      {/* Code example */}
      <div className="mt-4">
        <div className="text-xs font-semibold mb-2">The difference:</div>
        <CodeSnippet code={useStateVsRefExample} language="tsx" />
      </div>

      {/* Tip */}
      <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/30">
        <div className="flex items-start gap-2">
          <HiOutlineLightBulb className="text-warning shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-base-content/70">
            <strong className="text-warning">Key insight:</strong> The ref value IS updating when
            you click (check console), but React doesn't know to re-render. Click "Force Re-render"
            to see the actual ref value!
          </div>
        </div>
      </div>
    </div>
  );
}
