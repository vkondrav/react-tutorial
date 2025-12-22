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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#94a3b8',
              fontSize: '0.875rem',
            }}
          >
            name =
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
              color: '#f8fafc',
              fontSize: '1rem',
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#94a3b8',
              fontSize: '0.875rem',
            }}
          >
            age =
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
              color: '#f8fafc',
              fontSize: '1rem',
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {expressions.map((expr, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#0f172a',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #334155',
            }}
          >
            <div
              style={{
                color: '#64748b',
                fontSize: '0.75rem',
                marginBottom: '0.25rem',
                textTransform: 'uppercase',
              }}
            >
              {expr.label}
            </div>
            <code
              style={{
                color: '#fbbf24',
                fontSize: '0.8125rem',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              {expr.code}
            </code>
            <div style={{ color: '#22c55e', fontWeight: '600', fontSize: '0.9375rem' }}>
              → {expr.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
