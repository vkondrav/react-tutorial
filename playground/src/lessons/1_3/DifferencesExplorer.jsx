import { useState } from 'react';

export default function DifferencesExplorer() {
  const [selected, setSelected] = useState(null);

  const differences = [
    {
      id: 'class',
      html: 'class',
      jsx: 'className',
      reason: '"class" is a reserved keyword in JavaScript',
      example: '<div className="container">',
      color: '#ef4444',
    },
    {
      id: 'for',
      html: 'for',
      jsx: 'htmlFor',
      reason: '"for" is a reserved keyword in JavaScript (for loops)',
      example: '<label htmlFor="email">',
      color: '#f97316',
    },
    {
      id: 'events',
      html: 'onclick',
      jsx: 'onClick',
      reason: 'JSX uses camelCase for all event handlers',
      example: '<button onClick={handleClick}>',
      color: '#eab308',
    },
    {
      id: 'style',
      html: 'style="color: red"',
      jsx: 'style={{ color: "red" }}',
      reason: 'Style is an object, not a string. CSS properties are camelCase.',
      example: '<div style={{ backgroundColor: "blue", fontSize: 16 }}>',
      color: '#22c55e',
    },
    {
      id: 'closing',
      html: '<img> <br> <input>',
      jsx: '<img /> <br /> <input />',
      reason: 'All tags must be explicitly closed in JSX',
      example: '<img src="photo.jpg" alt="Photo" />',
      color: '#3b82f6',
    },
  ];

  const selectedDiff = differences.find((d) => d.id === selected);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {differences.map((diff) => (
          <button
            key={diff.id}
            onClick={() => setSelected(selected === diff.id ? null : diff.id)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selected === diff.id ? diff.color : '#0f172a',
              border: `2px solid ${diff.color}`,
              borderRadius: '0.5rem',
              color: selected === diff.id ? 'white' : diff.color,
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
            }}
          >
            {diff.html} → {diff.jsx}
          </button>
        ))}
      </div>

      <div
        style={{
          backgroundColor: '#0f172a',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          minHeight: '140px',
          border: selectedDiff ? `1px solid ${selectedDiff.color}44` : '1px solid #334155',
        }}
      >
        {selectedDiff ? (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              <code
                style={{
                  backgroundColor: '#ef444433',
                  color: '#fca5a5',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  textDecoration: 'line-through',
                }}
              >
                {selectedDiff.html}
              </code>
              <span style={{ color: '#64748b' }}>→</span>
              <code
                style={{
                  backgroundColor: '#22c55e33',
                  color: '#86efac',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                }}
              >
                {selectedDiff.jsx}
              </code>
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem', lineHeight: 1.6 }}>
              <strong>Why?</strong> {selectedDiff.reason}
            </p>
            <div
              style={{
                backgroundColor: '#1e293b',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontFamily: 'monospace',
                fontSize: '0.8125rem',
                color: '#94a3b8',
              }}
            >
              {selectedDiff.example}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#64748b',
            }}
          >
            👆 Click a difference above to learn more
          </div>
        )}
      </div>
    </div>
  );
}
