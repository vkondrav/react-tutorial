import { useState } from 'react';

export default function JSXTransformDemo() {
  const [showTransform, setShowTransform] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-green-500/30">
          <div className="px-4 py-2 bg-green-500/20 border-b border-green-500/30 text-xs font-semibold text-green-500">
            ✓ What you write (JSX)
          </div>
          <pre className="m-0 p-4 text-sm leading-relaxed text-slate-400">
            {`<h1 className="title">
  Hello, World!
</h1>`}
          </pre>
        </div>

        <button
          onClick={() => setShowTransform(!showTransform)}
          className={`p-3 rounded-full text-white cursor-pointer text-xl transition-colors ${
            showTransform ? 'bg-blue-500' : 'bg-slate-700'
          }`}
        >
          →
        </button>

        <div
          className={`bg-slate-900 rounded-xl overflow-hidden border border-orange-500/30 transition-opacity ${
            showTransform ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <div className="px-4 py-2 bg-orange-500/20 border-b border-orange-500/30 text-xs font-semibold text-orange-500">
            What React sees (JavaScript)
          </div>
          <pre className="m-0 p-4 text-sm leading-relaxed text-slate-400">
            {`React.createElement(
  'h1',
  { className: 'title' },
  'Hello, World!'
)`}
          </pre>
        </div>
      </div>
      <p className="text-slate-500 text-sm mt-4 text-center">
        👆 Click the arrow to see the transformation
      </p>
    </div>
  );
}
