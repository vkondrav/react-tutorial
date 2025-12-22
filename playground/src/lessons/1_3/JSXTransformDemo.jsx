import { useState } from 'react';

export default function JSXTransformDemo() {
  const [showTransform, setShowTransform] = useState(false);

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            border: '1px solid #22c55e44',
          }}
        >
          <div
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#22c55e22',
              borderBottom: '1px solid #22c55e44',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#22c55e',
            }}
          >
            ✓ What you write (JSX)
          </div>
          <pre
            style={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              color: '#94a3b8',
            }}
          >
            {`<h1 className="title">
  Hello, World!
</h1>`}
          </pre>
        </div>

        <button
          onClick={() => setShowTransform(!showTransform)}
          style={{
            padding: '0.75rem',
            backgroundColor: showTransform ? '#3b82f6' : '#334155',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1.25rem',
          }}
        >
          →
        </button>

        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            border: '1px solid #f9731644',
            opacity: showTransform ? 1 : 0.4,
            transition: 'opacity 0.3s',
          }}
        >
          <div
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#f9731622',
              borderBottom: '1px solid #f9731644',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#f97316',
            }}
          >
            What React sees (JavaScript)
          </div>
          <pre
            style={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              color: '#94a3b8',
            }}
          >
            {`React.createElement(
  'h1',
  { className: 'title' },
  'Hello, World!'
)`}
          </pre>
        </div>
      </div>
      <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '1rem', textAlign: 'center' }}>
        👆 Click the arrow to see the transformation
      </p>
    </div>
  );
}
