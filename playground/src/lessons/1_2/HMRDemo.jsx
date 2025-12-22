import { useState } from 'react';

export default function HMRDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <p className="leading-relaxed text-base-content/70 mt-0">
        <strong className="text-warning">Hot Module Replacement</strong> updates your app instantly
        while preserving state!
      </p>

      <div className="grid grid-cols-2 gap-4 card bg-base-200 p-6 mt-4">
        <div className="card bg-base-300 p-4">
          <div className="text-base-content/50 text-xs mb-2">Counter</div>
          <div className="text-3xl font-bold text-primary mb-3">{count}</div>
          <button onClick={() => setCount((c) => c + 1)} className="btn btn-primary">
            +1
          </button>
        </div>

        <div className="card bg-base-300 p-4">
          <div className="text-base-content/50 text-xs mb-2">Input</div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here..."
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </div>
  );
}
