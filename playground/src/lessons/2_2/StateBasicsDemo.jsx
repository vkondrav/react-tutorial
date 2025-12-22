import { useState } from 'react';

export default function StateBasicsDemo() {
  const [count, setCount] = useState(0);
  const [showCode, setShowCode] = useState(true);

  return (
    <div className="mt-6 bg-slate-800 rounded-xl overflow-hidden">
      {/* Live Demo */}
      <div className="p-8 flex flex-col items-center gap-6 border-b border-slate-700">
        <div className="text-xs text-slate-500 uppercase">Live Counter Example</div>
        <div className="text-7xl font-bold text-slate-50 font-mono">{count}</div>
        <div className="flex gap-3">
          <button
            onClick={() => setCount(count - 1)}
            className="px-6 py-3 bg-red-500 border-none rounded-lg text-white text-xl cursor-pointer font-bold hover:bg-red-600 transition-colors"
          >
            −
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-6 py-3 bg-slate-600 border-none rounded-lg text-white text-sm cursor-pointer hover:bg-slate-500 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setCount(count + 1)}
            className="px-6 py-3 bg-green-500 border-none rounded-lg text-white text-xl cursor-pointer font-bold hover:bg-green-600 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="w-full px-4 py-3 bg-slate-900 border-none border-b border-slate-700 text-slate-500 cursor-pointer text-sm hover:bg-slate-800 transition-colors"
      >
        {showCode ? '▼ Hide Code' : '▶ Show Code'}
      </button>

      {/* Code Explanation */}
      {showCode && (
        <div className="p-6">
          <pre className="m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-sm leading-relaxed">
            <code className="text-slate-200">
              <span className="text-purple-400">import</span>
              {` { `}
              <span className="text-green-500">useState</span>
              {` } `}
              <span className="text-purple-400">from</span>
              {` `}
              <span className="text-yellow-400">'react'</span>
              {`;\n\n`}
              <span className="text-purple-400">function</span>
              {` `}
              <span className="text-blue-500">Counter</span>
              {`() {\n`}
              <span className="text-slate-500">
                {'  '}// Declare state: [currentValue, setterFunction]
              </span>
              {`\n  `}
              <span className="text-purple-400">const</span>
              {` [`}
              <span className="text-amber-500">count</span>
              {`, `}
              <span className="text-pink-500">setCount</span>
              {`] = `}
              <span className="text-green-500">useState</span>
              {`(`}
              <span className="text-blue-500">0</span>
              {`);`}
              <span className="text-slate-500"> // 0 is initial value</span>
              {`\n\n  `}
              <span className="text-purple-400">return</span>
              {` (\n    <div>\n      <p>Count: {`}
              <span className="text-amber-500">count</span>
              {`}</p>\n      <button onClick={() => `}
              <span className="text-pink-500">setCount</span>
              {`(`}
              <span className="text-amber-500">count</span>
              {` + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}`}
            </code>
          </pre>

          {/* Anatomy */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-lg border-t-4 border-amber-500">
              <div className="text-amber-500 font-semibold mb-2">count</div>
              <div className="text-slate-400 text-sm">
                The current state value. Use this to display data.
              </div>
            </div>
            <div className="p-4 bg-slate-900 rounded-lg border-t-4 border-pink-500">
              <div className="text-pink-500 font-semibold mb-2">setCount</div>
              <div className="text-slate-400 text-sm">
                Function to update state. Calling it triggers a re-render.
              </div>
            </div>
            <div className="p-4 bg-slate-900 rounded-lg border-t-4 border-blue-500">
              <div className="text-blue-500 font-semibold mb-2">useState(0)</div>
              <div className="text-slate-400 text-sm">
                The hook call. 0 is the initial value (only used on first render).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key insight */}
      <div className="px-6 py-4 bg-green-500/10 border-t border-green-500 flex items-center gap-3">
        <span className="text-xl">💡</span>
        <span className="text-slate-400 text-sm">
          Every time you call <code className="text-pink-500">setCount</code>, React re-renders the
          component with the new value. Try clicking the buttons!
        </span>
      </div>
    </div>
  );
}
