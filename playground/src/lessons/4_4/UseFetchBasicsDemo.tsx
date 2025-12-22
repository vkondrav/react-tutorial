// ============================================
// Demo: Why useFetch?
// Shows the problem of repetitive fetch code
// ============================================

import { useState } from 'react';
import { HiOutlineLightBulb, HiX, HiCheck } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import beforeUseFetchCode from './examples/BeforeUseFetch.tsx?raw';
import afterUseFetchCode from './examples/AfterUseFetch.tsx?raw';

export default function UseFetchBasicsDemo(): React.ReactElement {
  const [showBefore, setShowBefore] = useState(true);

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        The Problem: Repetitive Fetch Code
      </h3>

      <p className="text-sm text-base-content/70 mb-4">
        Without a custom hook, you end up writing the same loading/error/data pattern in every
        component that fetches data. Let's see the difference:
      </p>

      {/* Toggle buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowBefore(true)}
          className={`btn btn-sm flex items-center gap-2 ${showBefore ? 'btn-error' : 'btn-ghost'}`}
        >
          <HiX size={16} />
          Before (Repetitive)
        </button>
        <button
          onClick={() => setShowBefore(false)}
          className={`btn btn-sm flex items-center gap-2 ${!showBefore ? 'btn-success' : 'btn-ghost'}`}
        >
          <HiCheck size={16} />
          After (useFetch)
        </button>
      </div>

      {/* Code comparison */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold ${showBefore ? 'text-error' : 'text-success'}`}>
            {showBefore
              ? '❌ Same code repeated in every component'
              : '✅ Logic extracted into reusable hook'}
          </span>
          <span className="text-xs text-base-content/60">
            {showBefore ? '~50 lines per component' : '~5 lines per component'}
          </span>
        </div>
        <CodeSnippet
          code={showBefore ? beforeUseFetchCode : afterUseFetchCode}
          language="tsx"
          title={showBefore ? 'Before: Repetitive Code' : 'After: useFetch Hook'}
        />
      </div>

      {/* Benefits summary */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="card bg-base-300 p-3 text-center">
          <div className="text-2xl mb-1 text-primary">🔄</div>
          <div className="text-xs font-semibold">Reusable</div>
          <div className="text-xs text-base-content/60">Write once, use everywhere</div>
        </div>
        <div className="card bg-base-300 p-3 text-center">
          <div className="text-2xl mb-1 text-secondary">🧪</div>
          <div className="text-xs font-semibold">Testable</div>
          <div className="text-xs text-base-content/60">Test the hook in isolation</div>
        </div>
        <div className="card bg-base-300 p-3 text-center">
          <div className="text-2xl mb-1 text-accent">📦</div>
          <div className="text-xs font-semibold">Consistent</div>
          <div className="text-xs text-base-content/60">Same behavior everywhere</div>
        </div>
      </div>
    </div>
  );
}
