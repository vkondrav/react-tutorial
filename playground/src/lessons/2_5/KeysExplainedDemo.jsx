import { useState } from 'react';
import { HiOutlineLightBulb, HiPlus, HiX, HiArrowUp } from 'react-icons/hi';

export default function KeysExplainedDemo() {
  const [items, setItems] = useState([
    { id: 'a1', name: 'First Item', color: 'bg-primary' },
    { id: 'b2', name: 'Second Item', color: 'bg-secondary' },
    { id: 'c3', name: 'Third Item', color: 'bg-accent' },
  ]);

  const addToStart = () => {
    const newId = `new-${Date.now()}`;
    setItems([{ id: newId, name: `New Item`, color: 'bg-success' }, ...items]);
  };

  const addToEnd = () => {
    const newId = `new-${Date.now()}`;
    setItems([...items, { id: newId, name: `New Item`, color: 'bg-success' }]);
  };

  const removeFirst = () => {
    setItems(items.slice(1));
  };

  const moveFirstToEnd = () => {
    if (items.length > 1) {
      const [first, ...rest] = items;
      setItems([...rest, first]);
    }
  };

  const reset = () => {
    setItems([
      { id: 'a1', name: 'First Item', color: 'bg-primary' },
      { id: 'b2', name: 'Second Item', color: 'bg-secondary' },
      { id: 'c3', name: 'Third Item', color: 'bg-accent' },
    ]);
  };

  return (
    <div className="mt-4 card bg-base-200 p-6">
      {/* Visual Demo */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-primary">How Keys Help React</h4>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={addToStart} className="btn btn-sm btn-success gap-1">
            <HiPlus size={14} /> Add to Start
          </button>
          <button onClick={addToEnd} className="btn btn-sm btn-success gap-1">
            <HiPlus size={14} /> Add to End
          </button>
          <button
            onClick={removeFirst}
            className="btn btn-sm btn-error gap-1"
            disabled={items.length === 0}
          >
            <HiX size={14} /> Remove First
          </button>
          <button
            onClick={moveFirstToEnd}
            className="btn btn-sm btn-warning gap-1"
            disabled={items.length < 2}
          >
            <HiArrowUp size={14} className="rotate-180" /> Move First to End
          </button>
          <button onClick={reset} className="btn btn-sm btn-ghost">
            Reset
          </button>
        </div>

        {/* List Display */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/50 mb-3 font-mono">
            // With proper keys: key={'{item.id}'}
          </div>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg ${item.color} text-white flex justify-between items-center transition-all`}
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-xs opacity-75 font-mono">key="{item.id}"</span>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center text-base-content/50 py-4">
                No items. Click "Add" to add some!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Rules */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-primary">What Makes a Good Key?</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Good Keys */}
          <div className="card bg-success/10 border border-success/30 p-4">
            <div className="font-semibold text-success mb-2">✓ Good Keys</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>
                  <strong>Database IDs:</strong> <code>user.id</code>, <code>post._id</code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>
                  <strong>Unique identifiers:</strong> <code>uuid()</code>, <code>nanoid()</code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">•</span>
                <span>
                  <strong>Natural unique values:</strong> email, username, slug
                </span>
              </li>
            </ul>
          </div>

          {/* Bad Keys */}
          <div className="card bg-error/10 border border-error/30 p-4">
            <div className="font-semibold text-error mb-2">✗ Bad Keys</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-error">•</span>
                <span>
                  <strong>Array index:</strong> <code>key={'{index}'}</code> (usually)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error">•</span>
                <span>
                  <strong>Random values:</strong> <code>Math.random()</code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error">•</span>
                <span>
                  <strong>Non-unique:</strong> duplicates cause bugs!
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Why It Matters */}
      <div className="p-4 rounded-lg bg-info/10 flex items-start gap-3">
        <HiOutlineLightBulb className="text-info shrink-0 mt-0.5" size={20} />
        <div className="text-sm">
          <strong className="text-info">Why does this matter?</strong>
          <p className="mt-1 text-base-content/70">
            When you add, remove, or reorder items, React uses keys to determine which DOM elements
            to update. With proper keys, React can efficiently update only what changed. With bad
            keys (like index), React might recreate elements unnecessarily or lose component state.
          </p>
        </div>
      </div>
    </div>
  );
}
