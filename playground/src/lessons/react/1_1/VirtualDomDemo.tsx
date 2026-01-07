// ============================================
// VirtualDomDemo - Virtual DOM Explanation
// ============================================

import { useState } from 'react';
import { HiOutlineHand } from 'react-icons/hi';

export default function VirtualDomDemo(): React.ReactElement {
  const [name, setName] = useState<string>('World');
  const [updates, setUpdates] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
    setUpdates((prev) => prev + 1);
  };

  return (
    <div>
      <p className="leading-relaxed text-base-content/70 mt-0">
        React uses a <strong className="text-primary">Virtual DOM</strong> - when state changes,
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
          <p className="m-0 text-xl flex items-center gap-2">
            Hello, <span className="text-primary font-semibold">{name || '...'}</span>!
            <HiOutlineHand className="text-warning" size={24} />
          </p>
        </div>

        <div className="text-sm text-base-content/60 mt-4">
          DOM updates: <strong className="text-success">{updates}</strong>
        </div>
      </div>
    </div>
  );
}
