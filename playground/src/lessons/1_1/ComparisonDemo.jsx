import { useState } from 'react';
import { HiOutlineCursorClick } from 'react-icons/hi';
import { CodeBlock } from '../components';

export default function ComparisonDemo() {
  const [count, setCount] = useState(0);

  const imperativeCode = `// Imperative (Vanilla JS)
const btn = document.getElementById('btn');
const display = document.getElementById('count');

btn.addEventListener('click', () => {
  const current = parseInt(display.textContent);
  display.textContent = current + 1;
});`;

  const declarativeCode = `// Declarative (React)
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

      <div className="card bg-base-200 p-6 text-center">
        <p className="mb-4 text-base-content/70 flex items-center justify-center gap-2">
          <HiOutlineCursorClick className="text-primary" size={18} />
          Try it! This is a <strong className="text-primary ml-1">real React component</strong>:
        </p>
        <div className="text-3xl font-bold mb-4">{count}</div>
        <div className="flex gap-2 justify-center">
          <button onClick={() => setCount(count - 1)} className="btn btn-error btn-lg">
            −
          </button>
          <button onClick={() => setCount(count + 1)} className="btn btn-primary btn-lg">
            +
          </button>
          <button onClick={() => setCount(0)} className="btn btn-lg btn-outline">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
