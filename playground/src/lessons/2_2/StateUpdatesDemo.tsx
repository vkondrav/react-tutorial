// ============================================
// StateUpdatesDemo - Batching and Functional Updates
// ============================================

import { useState } from 'react';
import { HiX, HiCheck, HiOutlineRefresh, HiOutlineArrowRight } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import functionalUpdatesExample from './examples/FunctionalUpdates.tsx?raw';

// ============================================
// Types
// ============================================

type Tab = 'batching' | 'functional';

// ============================================
// Main Component
// ============================================

export default function StateUpdatesDemo(): React.ReactElement {
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [rightCount, setRightCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<Tab>('batching');

  const handleWrongTripleClick = (): void => {
    // This won't work as expected!
    setWrongCount(wrongCount + 1);
    setWrongCount(wrongCount + 1);
    setWrongCount(wrongCount + 1);
  };

  const handleRightTripleClick = (): void => {
    // This works correctly!
    setRightCount((prev) => prev + 1);
    setRightCount((prev) => prev + 1);
    setRightCount((prev) => prev + 1);
  };

  const wrongExampleCode = `// All three see count = ${wrongCount}!
setCount(count + 1); // ${wrongCount} + 1
setCount(count + 1); // ${wrongCount} + 1
setCount(count + 1); // ${wrongCount} + 1`;

  const rightExampleCode = `// Each gets latest value!
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);`;

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-base-300">
        <button
          onClick={() => setActiveTab('batching')}
          className={`flex-1 px-4 py-3 border-none cursor-pointer font-medium transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'batching'
              ? 'bg-base-300 border-b-2 border-b-primary text-primary'
              : 'bg-transparent border-b-2 border-b-transparent text-base-content/50'
          }`}
        >
          <HiOutlineRefresh size={16} />
          Batching Problem
        </button>
        <button
          onClick={() => setActiveTab('functional')}
          className={`flex-1 px-4 py-3 border-none cursor-pointer font-medium transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'functional'
              ? 'bg-base-300 border-b-2 border-b-success text-success'
              : 'bg-transparent border-b-2 border-b-transparent text-base-content/50'
          }`}
        >
          <HiCheck size={16} />
          Functional Updates
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'batching' && (
          <>
            <div className="mb-6">
              <p className="text-base-content/70 text-sm m-0">
                React <strong className="text-warning">batches</strong> state updates for
                performance. Multiple updates in the same event use the{' '}
                <strong>same starting value</strong>!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Wrong Way */}
              <div className="card bg-base-300 p-6 border-2 border-error">
                <div className="text-error text-xs mb-4 flex items-center gap-2">
                  <HiX size={14} />
                  WRONG - Using Current Value
                </div>
                <CodeSnippet code={wrongExampleCode} language="tsx" showCopy={false} />
                <div className="mt-4 text-5xl font-bold text-base-content text-center font-mono">
                  {wrongCount}
                </div>
                <button onClick={handleWrongTripleClick} className="btn btn-error w-full mt-4">
                  +3 (but only adds 1!)
                </button>
              </div>

              {/* Right Way */}
              <div className="card bg-base-300 p-6 border-2 border-success">
                <div className="text-success text-xs mb-4 flex items-center gap-2">
                  <HiCheck size={14} />
                  CORRECT - Using Functional Update
                </div>
                <CodeSnippet code={rightExampleCode} language="tsx" showCopy={false} />
                <div className="mt-4 text-5xl font-bold text-base-content text-center font-mono">
                  {rightCount}
                </div>
                <button onClick={handleRightTripleClick} className="btn btn-success w-full mt-4">
                  +3 (actually adds 3!)
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setWrongCount(0);
                setRightCount(0);
              }}
              className="btn btn-ghost btn-sm mt-4"
            >
              Reset Both
            </button>
          </>
        )}

        {activeTab === 'functional' && (
          <>
            <div className="mb-6">
              <p className="text-base-content/70 text-sm m-0">
                Use <strong className="text-success">functional updates</strong> when your new state
                depends on the previous state:
              </p>
            </div>

            <div className="card bg-base-300 p-6">
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                <div>
                  <div className="text-error text-xs mb-2 flex items-center gap-1">
                    <HiX size={12} />
                    Direct Value
                  </div>
                  <CodeSnippet code={`setCount(count + 1)`} language="tsx" showCopy={false} />
                </div>
                <HiOutlineArrowRight className="text-base-content/50" size={24} />
                <div>
                  <div className="text-success text-xs mb-2 flex items-center gap-1">
                    <HiCheck size={12} />
                    Functional Update
                  </div>
                  <CodeSnippet
                    code={`setCount(prev => prev + 1)`}
                    language="tsx"
                    showCopy={false}
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="text-base-content/50 text-xs mb-3">
                  WHEN TO USE FUNCTIONAL UPDATES:
                </div>
                <ul className="m-0 pl-5 text-base-content/70 text-sm leading-relaxed list-disc">
                  <li>Incrementing/decrementing numbers</li>
                  <li>Toggling booleans</li>
                  <li>Adding/removing from arrays</li>
                  <li>Updating object properties</li>
                </ul>
              </div>

              <div className="mt-6">
                <div className="text-base-content/50 text-xs mb-2">EXAMPLES:</div>
                <CodeSnippet code={functionalUpdatesExample} language="tsx" showCopy={false} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
