import { useState } from 'react';
import { HiX, HiPlus, HiOutlineExclamationCircle, HiCheck } from 'react-icons/hi';

// Item component that maintains its own input state
function ListItem({ item, onRemove }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex items-center gap-2 p-2 rounded bg-base-200">
      <span className="font-medium flex-1">{item.name}</span>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type here..."
        className="input input-bordered input-sm w-32"
      />
      <button
        onClick={() => onRemove(item.id)}
        className="btn btn-ghost btn-sm btn-square text-error"
      >
        <HiX size={16} />
      </button>
    </div>
  );
}

export default function KeyMistakesDemo() {
  // Two separate lists to compare behavior
  const [badKeyItems, setBadKeyItems] = useState([
    { id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
    { id: 3, name: 'Item C' },
  ]);

  const [goodKeyItems, setGoodKeyItems] = useState([
    { id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
    { id: 3, name: 'Item C' },
  ]);

  const addToBadList = () => {
    setBadKeyItems([
      { id: Date.now(), name: `Item ${String.fromCharCode(65 + badKeyItems.length)}` },
      ...badKeyItems,
    ]);
  };

  const addToGoodList = () => {
    setGoodKeyItems([
      { id: Date.now(), name: `Item ${String.fromCharCode(65 + goodKeyItems.length)}` },
      ...goodKeyItems,
    ]);
  };

  const removeFromBadList = (id) => {
    setBadKeyItems(badKeyItems.filter((item) => item.id !== id));
  };

  const removeFromGoodList = (id) => {
    setGoodKeyItems(goodKeyItems.filter((item) => item.id !== id));
  };

  const reset = () => {
    setBadKeyItems([
      { id: 1, name: 'Item A' },
      { id: 2, name: 'Item B' },
      { id: 3, name: 'Item C' },
    ]);
    setGoodKeyItems([
      { id: 1, name: 'Item A' },
      { id: 2, name: 'Item B' },
      { id: 3, name: 'Item C' },
    ]);
  };

  return (
    <div className="mt-4 card bg-base-200 p-6">
      <div className="mb-4 p-3 rounded-lg bg-warning/10 border border-warning/30 flex items-start gap-3">
        <HiOutlineExclamationCircle className="text-warning shrink-0 mt-0.5" size={20} />
        <div className="text-sm">
          <strong className="text-warning">Try this experiment:</strong>
          <ol className="mt-2 space-y-1 text-base-content/70">
            <li>1. Type something in the input fields on both sides</li>
            <li>2. Click "Add to Start" on both lists</li>
            <li>3. Notice how the input values behave differently!</li>
          </ol>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Bad: Using Index as Key */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <HiX className="text-error" size={20} />
            <h4 className="font-semibold text-error">Using Index as Key</h4>
          </div>

          <div className="card bg-base-300 p-4">
            <div className="text-xs text-base-content/50 mb-3 font-mono">
              {'key={index}'} {/* Bad! */}
            </div>

            <button onClick={addToBadList} className="btn btn-sm btn-error gap-1 mb-3">
              <HiPlus size={14} /> Add to Start
            </button>

            <div className="space-y-2">
              {badKeyItems.map((item, index) => (
                <ListItem
                  key={index} // BAD: Using index as key
                  item={item}
                  onRemove={removeFromBadList}
                  label={`key=${index}`}
                />
              ))}
            </div>

            <div className="mt-3 p-2 rounded bg-error/10 text-xs text-error">
              ⚠️ Input values get "stuck" to wrong items!
            </div>
          </div>
        </div>

        {/* Good: Using ID as Key */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <HiCheck className="text-success" size={20} />
            <h4 className="font-semibold text-success">Using ID as Key</h4>
          </div>

          <div className="card bg-base-300 p-4">
            <div className="text-xs text-base-content/50 mb-3 font-mono">
              {'key={item.id}'} {/* Good! */}
            </div>

            <button onClick={addToGoodList} className="btn btn-sm btn-success gap-1 mb-3">
              <HiPlus size={14} /> Add to Start
            </button>

            <div className="space-y-2">
              {goodKeyItems.map((item) => (
                <ListItem
                  key={item.id} // GOOD: Using unique ID
                  item={item}
                  onRemove={removeFromGoodList}
                  label={`key=${item.id}`}
                />
              ))}
            </div>

            <div className="mt-3 p-2 rounded bg-success/10 text-xs text-success">
              ✓ Input values stay with their items!
            </div>
          </div>
        </div>
      </div>

      <button onClick={reset} className="btn btn-ghost btn-sm mt-4">
        Reset Both Lists
      </button>

      {/* When Index IS OK */}
      <div className="mt-6 p-4 rounded-lg bg-base-300">
        <h4 className="font-semibold mb-2">When is index as key acceptable?</h4>
        <ul className="space-y-1 text-sm text-base-content/70">
          <li>
            • The list is <strong>static</strong> (never reorders, adds, or removes items)
          </li>
          <li>
            • Items have <strong>no unique ID</strong> and list order is stable
          </li>
          <li>
            • Items have <strong>no state</strong> (no inputs, no checkboxes, etc.)
          </li>
        </ul>
        <p className="mt-2 text-sm text-base-content/50 italic">
          When in doubt, use a unique ID. It's safer and more maintainable.
        </p>
      </div>
    </div>
  );
}
