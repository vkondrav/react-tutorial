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

      <div className="card bg-base-200 p-6 mt-4">
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Type your name"
          className="input input-bordered w-full mb-4"
        />

        <div className="card bg-base-300 p-4">
          <p className="m-0 text-xl">
            Hello, <span className="text-primary font-semibold">{name || '...'}</span>! 👋
          </p>
        </div>

        <div className="text-sm text-base-content/60 mt-4">
          DOM updates: <strong className="text-success">{updates}</strong>
        </div>
      </div>
    </div>
  );
}
