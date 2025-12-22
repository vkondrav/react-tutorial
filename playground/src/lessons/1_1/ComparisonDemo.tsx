// ============================================
// ComparisonDemo - Imperative vs Declarative
// ============================================

import { useState } from 'react';
import { HiOutlineCursorClick, HiCheck, HiX } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import imperativeCode from './examples/ImperativeCode.js?raw';
import declarativeCode from './examples/DeclarativeCode.tsx?raw';

export default function ComparisonDemo(): React.ReactElement {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      {/* Code Comparison */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Imperative (Bad) */}
        <div className="bg-base-100 rounded-xl overflow-hidden border border-error/50">
          <div className="px-4 py-2 bg-error/20 border-b border-error/50 text-xs font-semibold text-error flex items-center gap-2">
            <HiX size={16} />
            Imperative (Vanilla JS)
          </div>
          <CodeSnippet code={imperativeCode} language="javascript" showCopy={false} />
        </div>

        {/* Declarative (Good) */}
        <div className="bg-base-100 rounded-xl overflow-hidden border border-success/50">
          <div className="px-4 py-2 bg-success/20 border-b border-success/50 text-xs font-semibold text-success flex items-center gap-2">
            <HiCheck size={16} />
            Declarative (React)
          </div>
          <CodeSnippet code={declarativeCode} language="tsx" showCopy={false} />
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="card bg-base-200 p-6 text-center">
        <p className="mb-4 text-base-content/70 flex items-center justify-center gap-2">
          <HiOutlineCursorClick className="text-primary" size={18} />
          Try it! This is a <strong className="text-primary ml-1">real React component</strong>:
        </p>
        <div className="text-3xl font-bold mb-4">{count}</div>
        <div className="flex gap-2 justify-center">
          <button onClick={() => setCount((c) => c - 1)} className="btn btn-error btn-lg">
            −
          </button>
          <button onClick={() => setCount((c) => c + 1)} className="btn btn-primary btn-lg">
            +
          </button>
          <button onClick={() => setCount(0)} className="btn btn-lg btn-outline">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
