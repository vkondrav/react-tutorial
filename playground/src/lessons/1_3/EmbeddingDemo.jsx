import { useState } from 'react';

export default function EmbeddingDemo() {
  const [name, setName] = useState('React Developer');
  const [age, setAge] = useState(25);

  const expressions = [
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
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-2 text-slate-400 text-sm">name =</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-50 text-base focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
        <div>
          <label className="block mb-2 text-slate-400 text-sm">age =</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-50 text-base focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        {expressions.map((expr, i) => (
          <div key={i} className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <div className="text-slate-500 text-xs mb-1 uppercase">{expr.label}</div>
            <code className="text-amber-400 text-sm block mb-2">{expr.code}</code>
            <div className="text-green-500 font-semibold text-sm">→ {expr.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
