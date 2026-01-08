// ============================================
// ConditionalBasicsDemo - Introduction to Conditional Rendering
// ============================================

import { useState } from 'react';
import {
  HiChevronDown,
  HiChevronRight,
  HiOutlineLightBulb,
  HiOutlineLockClosed,
  HiOutlineHand,
} from 'react-icons/hi';
import { CodeSnippet } from '@components';
import ternaryBasicExample from './examples/TernaryBasicExample.tsx?raw';

// ============================================
// Main Component
// ============================================

export default function ConditionalBasicsDemo(): React.ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(true);

  return (
    <div className="mt-4 card bg-base-200 p-6">
      {/* Controls */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className={`btn ${isLoggedIn ? 'btn-error' : 'btn-success'}`}
        >
          {isLoggedIn ? (
            <>
              <HiOutlineLockClosed size={18} />
              Log Out
            </>
          ) : (
            <>
              <HiOutlineHand size={18} />
              Log In
            </>
          )}
        </button>

        <div className="px-4 py-2 bg-base-300 rounded-lg font-mono text-sm">
          isLoggedIn ={' '}
          <span className={isLoggedIn ? 'text-success' : 'text-error'}>{String(isLoggedIn)}</span>
        </div>
      </div>

      {/* Live Result */}
      <div className="card bg-base-300 p-6 mb-4 border-2 border-primary">
        <div className="text-primary text-xs mb-3 font-semibold flex items-center gap-2">
          <span>🎬</span>
          LIVE RESULT
        </div>

        {/* This is the conditional rendering in action! */}
        <div className="text-xl flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <span className="text-2xl">👋</span>
              <span>
                Welcome back, <strong className="text-success">User!</strong>
              </span>
            </>
          ) : (
            <>
              <HiOutlineLockClosed className="text-2xl text-warning" />
              <span>
                Please <strong className="text-warning">log in</strong> to continue
              </span>
            </>
          )}
        </div>
      </div>

      {/* Toggle Code View */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-outline btn-sm mb-4">
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
        <CodeSnippet
          code={ternaryBasicExample}
          language="tsx"
          title="Using ternary operator for conditional rendering"
          showCopy={false}
        />
      )}

      {/* Explanation */}
      <div className="mt-4 p-4 card bg-primary/10 border-l-4 border-primary">
        <div className="font-semibold mb-2 text-primary flex items-center gap-2">
          <HiOutlineLightBulb size={18} />
          How it works
        </div>
        <div className="text-sm leading-relaxed text-base-content/70">
          The <code className="text-warning">?</code> is called the{' '}
          <strong>ternary operator</strong>. It works like:{' '}
          <code>condition ? valueIfTrue : valueIfFalse</code>. Inside JSX, we use it to choose
          between different elements to render!
        </div>
      </div>
    </div>
  );
}
