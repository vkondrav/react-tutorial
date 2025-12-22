import { useState } from 'react';

export default function HMRDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <p className="leading-relaxed text-slate-400 mt-0">
        <strong className="text-orange-500">Hot Module Replacement</strong> updates your app
        instantly while preserving state!
      </p>

      <div className="grid grid-cols-2 gap-4 bg-slate-900 p-6 rounded-xl mt-4">
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="text-slate-500 text-xs mb-2">Counter</div>
          <div className="text-3xl font-bold text-cyan-400 mb-3">{count}</div>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
          >
            +1
          </button>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="text-slate-500 text-xs mb-2">Input</div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here..."
            className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-50 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
