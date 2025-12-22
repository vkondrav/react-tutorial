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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <CodeBlock title="Imperative (Vanilla JS)" code={imperativeCode} variant="bad" />
        <CodeBlock title="Declarative (React)" code={declarativeCode} variant="good" />
      </div>

      <div
        style={{
          backgroundColor: '#0f172a',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: '0 0 1rem', color: '#94a3b8' }}>
          👇 Try it! This is a <strong style={{ color: '#38bdf8' }}>real React component</strong>:
        </p>
        <div
          style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#f8fafc' }}
        >
          {count}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button
            onClick={() => setCount(count - 1)}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#475569',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.25rem',
              cursor: 'pointer',
            }}
          >
            −
          </button>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.25rem',
              cursor: 'pointer',
            }}
          >
            +
          </button>
          <button
            onClick={() => setCount(0)}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#334155',
              color: '#94a3b8',
              border: '1px solid #475569',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
