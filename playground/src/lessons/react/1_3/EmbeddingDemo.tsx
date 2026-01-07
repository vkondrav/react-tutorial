// ============================================
// EmbeddingDemo - Embedding JavaScript in JSX
// ============================================

import { useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';

// ============================================
// Types
// ============================================

interface Expression {
  label: string;
  code: string;
  result: string | number;
}

// ============================================
// Main Component
// ============================================

export default function EmbeddingDemo(): React.ReactElement {
  const [name, setName] = useState<string>('React Developer');
  const [age, setAge] = useState<number>(25);

  const expressions: Expression[] = [
    { label: 'Variable', code: '{name}', result: name },
    { label: 'Math', code: '{age + 1}', result: age + 1 },
    { label: 'Method', code: '{name.toUpperCase()}', result: name.toUpperCase() },
    {
      label: 'Ternary',
      code: '{age >= 18 ? "Adult" : "Minor"}',
      result: age >= 18 ? 'Adult' : 'Minor',
    },
    { label: 'Template', code: '{`Hello, ${name}!`}', result: `Hello, ${name}!` },
  ];

  return (
    <div>
      {/* Input Controls */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-2 text-base-content/70 text-sm">name =</label>
          <input
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block mb-2 text-base-content/70 text-sm">age =</label>
          <input
            type="number"
            value={age}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAge(parseInt(e.target.value) || 0)
            }
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Expression Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        {expressions.map((expr, i) => (
          <div key={i} className="card bg-base-200 p-4 border border-base-300">
            <div className="text-base-content/50 text-xs mb-1 uppercase">{expr.label}</div>
            <code className="text-warning text-sm block mb-2">{expr.code}</code>
            <div className="text-success font-semibold text-sm flex items-center gap-1">
              <HiOutlineArrowRight size={14} />
              {expr.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
