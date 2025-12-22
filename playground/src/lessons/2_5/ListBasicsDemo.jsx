import { useState } from 'react';
import { HiChevronDown, HiChevronRight, HiOutlineLightBulb } from 'react-icons/hi';

export default function ListBasicsDemo() {
  const [showCode, setShowCode] = useState(true);

  // Sample data
  const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

  const users = [
    { id: 1, name: 'Alice', role: 'Developer' },
    { id: 2, name: 'Bob', role: 'Designer' },
    { id: 3, name: 'Charlie', role: 'Manager' },
  ];

  return (
    <div className="mt-4 card bg-base-200 p-6">
      {/* Simple Array Example */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-primary">Simple Array → List</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Data */}
          <div className="card bg-base-300 p-4">
            <div className="text-xs text-base-content/50 mb-2 font-mono">// Data</div>
            <pre className="text-sm font-mono text-secondary">
              {`const fruits = [
  'Apple',
  'Banana', 
  'Cherry',
  'Date',
  'Elderberry'
];`}
            </pre>
          </div>

          {/* Result */}
          <div className="card bg-base-300 p-4">
            <div className="text-xs text-base-content/50 mb-2">Result</div>
            <ul className="list-disc list-inside space-y-1">
              {fruits.map((fruit) => (
                <li key={fruit} className="text-base-content">
                  {fruit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Object Array Example */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-primary">Object Array → Cards</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Data */}
          <div className="card bg-base-300 p-4">
            <div className="text-xs text-base-content/50 mb-2 font-mono">// Data</div>
            <pre className="text-sm font-mono text-secondary">
              {`const users = [
  { id: 1, name: 'Alice', role: 'Developer' },
  { id: 2, name: 'Bob', role: 'Designer' },
  { id: 3, name: 'Charlie', role: 'Manager' },
];`}
            </pre>
          </div>

          {/* Result */}
          <div className="card bg-base-300 p-4">
            <div className="text-xs text-base-content/50 mb-2">Result</div>
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center gap-3 p-2 rounded bg-base-200">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content text-sm font-semibold">
                    {user.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-base-content/50">{user.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-ghost gap-2 mb-3">
        {showCode ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
        {showCode ? 'Hide' : 'Show'} Code
      </button>

      {showCode && (
        <div className="card bg-base-300 p-4 font-mono text-sm">
          <div className="text-success mb-2">// The .map() pattern</div>
          <pre className="text-base-content/80">
            {`{users.map((user) => (
  <UserCard key={user.id} user={user} />
))}

// Or inline:
{fruits.map((fruit) => (
  <li key={fruit}>{fruit}</li>
))}`}
          </pre>
        </div>
      )}

      {/* Tip */}
      <div className="mt-4 p-3 rounded-lg bg-info/10 flex items-start gap-3">
        <HiOutlineLightBulb className="text-info shrink-0 mt-0.5" size={18} />
        <div className="text-sm text-info">
          <strong>Remember:</strong> <code>.map()</code> returns a new array. Each element in the
          returned array becomes a React element. Don't forget the <code>key</code> prop!
        </div>
      </div>
    </div>
  );
}
