import { useState } from 'react';
import { CodeBlock } from '../components';

export default function ComparisonDemo() {
  const [count, setCount] = useState(0);

  const imperativeCode = `// ❌ Imperative (Vanilla JS)
const btn = document.getElementById('btn');
const display = document.getElementById('count');

btn.addEventListener('click', () => {
  const current = parseInt(display.textContent);
  display.textContent = current + 1;
});`;

  const declarativeCode = `// ✅ Declarative (React)
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Add
      </button>
    </div>
  );
}`;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <CodeBlock title="Imperative (Vanilla JS)" code={imperativeCode} variant="bad" />
        <CodeBlock title="Declarative (React)" code={declarativeCode} variant="good" />
      </div>

      <div className="bg-slate-900 p-6 rounded-xl text-center">
        <p className="mb-4 text-slate-400">
          👇 Try it! This is a <strong className="text-cyan-400">real React component</strong>:
        </p>
        <div className="text-3xl font-bold mb-4 text-slate-50">{count}</div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setCount(count - 1)}
            className="px-6 py-2 bg-slate-600 text-white rounded-lg text-xl cursor-pointer hover:bg-slate-500 transition-colors"
          >
            −
          </button>
          <button
            onClick={() => setCount(count + 1)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg text-xl cursor-pointer hover:bg-blue-600 transition-colors"
          >
            +
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-6 py-2 bg-slate-700 text-slate-400 border border-slate-600 rounded-lg text-sm cursor-pointer hover:bg-slate-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
