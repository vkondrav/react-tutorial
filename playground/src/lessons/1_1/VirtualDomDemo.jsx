import { useState } from 'react';

export default function VirtualDomDemo() {
  const [name, setName] = useState('World');
  const [updates, setUpdates] = useState(0);

  const handleChange = (e) => {
    setName(e.target.value);
    setUpdates((prev) => prev + 1);
  };

  return (
    <div>
      <p className="leading-relaxed text-slate-400 mt-0">
        React uses a <strong className="text-cyan-400">Virtual DOM</strong> - when state changes,
        React only updates what actually changed.
      </p>

      <div className="bg-slate-900 p-6 rounded-xl mt-4">
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Type your name"
          className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 text-base mb-4 focus:outline-none focus:border-cyan-500 transition-colors"
        />

        <div className="p-4 bg-slate-800 rounded-lg">
          <p className="m-0 text-xl">
            Hello, <span className="text-cyan-400 font-semibold">{name || '...'}</span>! 👋
          </p>
        </div>

        <div className="text-sm text-slate-500 mt-4">
          DOM updates: <strong className="text-green-500">{updates}</strong>
        </div>
      </div>
    </div>
  );
}
