import { useState } from 'react';

export default function StateUpdatesDemo() {
  const [wrongCount, setWrongCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [activeTab, setActiveTab] = useState('batching');

  const handleWrongTripleClick = () => {
    // This won't work as expected!
    setWrongCount(wrongCount + 1);
    setWrongCount(wrongCount + 1);
    setWrongCount(wrongCount + 1);
  };

  const handleRightTripleClick = () => {
    // This works correctly!
    setRightCount((prev) => prev + 1);
    setRightCount((prev) => prev + 1);
    setRightCount((prev) => prev + 1);
  };

  return (
    <div className="mt-6 bg-slate-800 rounded-xl overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('batching')}
          className={`flex-1 px-4 py-3 border-none cursor-pointer font-medium transition-colors ${
            activeTab === 'batching'
              ? 'bg-slate-900 border-b-2 border-b-blue-500 text-blue-500'
              : 'bg-transparent border-b-2 border-b-transparent text-slate-500'
          }`}
        >
          🔄 Batching Problem
        </button>
        <button
          onClick={() => setActiveTab('functional')}
          className={`flex-1 px-4 py-3 border-none cursor-pointer font-medium transition-colors ${
            activeTab === 'functional'
              ? 'bg-slate-900 border-b-2 border-b-green-500 text-green-500'
              : 'bg-transparent border-b-2 border-b-transparent text-slate-500'
          }`}
        >
          ✅ Functional Updates
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'batching' && (
          <>
            <div className="mb-6">
              <p className="text-slate-400 text-sm m-0">
                React <strong className="text-amber-500">batches</strong> state updates for
                performance. Multiple updates in the same event use the{' '}
                <strong>same starting value</strong>!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Wrong Way */}
              <div className="p-6 bg-slate-900 rounded-lg border border-red-500">
                <div className="text-red-500 text-xs mb-4">❌ WRONG - Using Current Value</div>
                <pre className="m-0 p-3 bg-slate-800 rounded-md text-[0.7rem] leading-relaxed">
                  <code className="text-slate-400">
                    {`// All three see count = ${wrongCount}!\nsetCount(count + 1); // ${wrongCount} + 1\nsetCount(count + 1); // ${wrongCount} + 1\nsetCount(count + 1); // ${wrongCount} + 1`}
                  </code>
                </pre>
                <div className="mt-4 text-5xl font-bold text-slate-50 text-center font-mono">
                  {wrongCount}
                </div>
                <button
                  onClick={handleWrongTripleClick}
                  className="w-full mt-4 px-4 py-3 bg-red-500 border-none rounded-lg text-white cursor-pointer text-sm hover:bg-red-600 transition-colors"
                >
                  +3 (but only adds 1!)
                </button>
              </div>

              {/* Right Way */}
              <div className="p-6 bg-slate-900 rounded-lg border border-green-500">
                <div className="text-green-500 text-xs mb-4">
                  ✅ CORRECT - Using Functional Update
                </div>
                <pre className="m-0 p-3 bg-slate-800 rounded-md text-[0.7rem] leading-relaxed">
                  <code className="text-slate-400">
                    {`// Each gets latest value!\nsetCount(prev => prev + 1);\nsetCount(prev => prev + 1);\nsetCount(prev => prev + 1);`}
                  </code>
                </pre>
                <div className="mt-4 text-5xl font-bold text-slate-50 text-center font-mono">
                  {rightCount}
                </div>
                <button
                  onClick={handleRightTripleClick}
                  className="w-full mt-4 px-4 py-3 bg-green-500 border-none rounded-lg text-white cursor-pointer text-sm hover:bg-green-600 transition-colors"
                >
                  +3 (actually adds 3!)
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setWrongCount(0);
                setRightCount(0);
              }}
              className="mt-4 px-4 py-2 bg-slate-600 border-none rounded-md text-white cursor-pointer text-xs hover:bg-slate-500 transition-colors"
            >
              Reset Both
            </button>
          </>
        )}

        {activeTab === 'functional' && (
          <>
            <div className="mb-6">
              <p className="text-slate-400 text-sm m-0">
                Use <strong className="text-green-500">functional updates</strong> when your new
                state depends on the previous state:
              </p>
            </div>

            <div className="p-6 bg-slate-900 rounded-lg">
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                <div>
                  <div className="text-red-500 text-xs mb-2">❌ Direct Value</div>
                  <pre className="m-0 p-3 bg-slate-800 rounded-md text-xs">
                    <code className="text-slate-400">{`setCount(count + 1)`}</code>
                  </pre>
                </div>
                <div className="text-slate-500 text-2xl">→</div>
                <div>
                  <div className="text-green-500 text-xs mb-2">✅ Functional Update</div>
                  <pre className="m-0 p-3 bg-slate-800 rounded-md text-xs">
                    <code className="text-slate-400">{`setCount(prev => prev + 1)`}</code>
                  </pre>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-slate-500 text-xs mb-3">WHEN TO USE FUNCTIONAL UPDATES:</div>
                <ul className="m-0 pl-5 text-slate-400 text-sm leading-relaxed list-disc">
                  <li>Incrementing/decrementing numbers</li>
                  <li>Toggling booleans</li>
                  <li>Adding/removing from arrays</li>
                  <li>Updating object properties</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-slate-800 rounded-lg">
                <div className="text-slate-500 text-xs mb-2">EXAMPLES:</div>
                <pre className="m-0 text-xs leading-relaxed text-slate-400">
                  {`// Toggle boolean
setIsOpen(prev => !prev);

// Add to array
setItems(prev => [...prev, newItem]);

// Update object
setUser(prev => ({ ...prev, name: 'New' }));`}
                </pre>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
