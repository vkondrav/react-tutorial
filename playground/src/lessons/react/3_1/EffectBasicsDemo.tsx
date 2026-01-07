// ============================================
// EffectBasicsDemo - Introduction to useEffect
// ============================================

import { useState, useEffect } from 'react';
import { HiOutlineLightBulb, HiChevronDown, HiChevronRight } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import basicEffectExample from './examples/BasicEffectExample.tsx?raw';

export default function EffectBasicsDemo(): React.ReactElement {
  const [count, setCount] = useState(0);
  const [showCode, setShowCode] = useState(false);

  // This effect runs after every render where count changes
  useEffect(() => {
    // Update document title as a visible side effect
    document.title = `Count: ${count} | React Tutorial`;
  }, [count]);

  return (
    <div className="card bg-base-300 p-6">
      <h3 className="text-lg font-semibold mb-4">Basic useEffect Example</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Interactive Demo */}
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-base-content/70 mb-2">Current count:</p>
            <p className="text-5xl font-bold text-primary mb-4">{count}</p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => setCount(count + 1)} className="btn btn-primary">
                Increment
              </button>
              <button onClick={() => setCount(0)} className="btn btn-outline">
                Reset
              </button>
            </div>
          </div>

          <div className="bg-base-200 rounded-lg p-3">
            <p className="text-sm text-base-content/70 mb-2">Effect Status:</p>
            <div className="font-mono text-xs space-y-2">
              <p className="text-success">✓ Document title synced to: "Count: {count}"</p>
              <p className="text-base-content/60">
                The effect runs after each render when count changes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-info/10 p-3 rounded-lg">
            <HiOutlineLightBulb className="text-info shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-base-content/80">
              Check your browser tab title — it updates via useEffect!
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div>
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 text-sm text-primary mb-2"
          >
            {showCode ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
            {showCode ? 'Hide' : 'Show'} Code
          </button>

          {showCode && <CodeSnippet code={basicEffectExample} language="tsx" showCopy={false} />}

          <div className="mt-4 space-y-3">
            <div className="bg-base-200 rounded-lg p-3">
              <p className="font-semibold text-sm mb-2">useEffect Structure:</p>
              <div className="font-mono text-xs space-y-1">
                <p>
                  <span className="text-secondary">useEffect</span>(
                </p>
                <p className="pl-4">
                  <span className="text-success">() =&gt; {'{'}</span>{' '}
                  <span className="text-base-content/60">// Effect function</span>
                </p>
                <p className="pl-8">
                  <span className="text-base-content/70">// Your side effect code</span>
                </p>
                <p className="pl-4">
                  <span className="text-success">{'}'}</span>,
                </p>
                <p className="pl-4">
                  <span className="text-warning">[dependencies]</span>{' '}
                  <span className="text-base-content/60">// When to re-run</span>
                </p>
                <p>);</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
