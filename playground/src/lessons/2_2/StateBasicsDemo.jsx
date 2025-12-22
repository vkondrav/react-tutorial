import { useState } from 'react';

export default function StateBasicsDemo() {
  const [count, setCount] = useState(0);
  const [showCode, setShowCode] = useState(true);

  return (
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      {/* Live Demo */}
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          borderBottom: '1px solid #334155',
        }}
      >
        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>
          Live Counter Example
        </div>
        <div
          style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#f8fafc',
            fontFamily: 'monospace',
          }}
        >
          {count}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => setCount(count - 1)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#ef4444',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
              fontSize: '1.25rem',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            −
          </button>
          <button
            onClick={() => setCount(0)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#475569',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#22c55e',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
              fontSize: '1.25rem',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setShowCode(!showCode)}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#0f172a',
          border: 'none',
          borderBottom: '1px solid #334155',
          color: '#64748b',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        {showCode ? '▼ Hide Code' : '▶ Show Code'}
      </button>

      {/* Code Explanation */}
      {showCode && (
        <div style={{ padding: '1.5rem' }}>
          <pre
            style={{
              margin: 0,
              padding: '1rem',
              backgroundColor: '#0f172a',
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '0.8rem',
              lineHeight: 1.8,
            }}
          >
            <code style={{ color: '#e2e8f0' }}>
              <span style={{ color: '#c084fc' }}>import</span>
              {` { `}
              <span style={{ color: '#22c55e' }}>useState</span>
              {` } `}
              <span style={{ color: '#c084fc' }}>from</span>
              {` `}
              <span style={{ color: '#fbbf24' }}>'react'</span>
              {`;\n\n`}
              <span style={{ color: '#c084fc' }}>function</span>
              {` `}
              <span style={{ color: '#3b82f6' }}>Counter</span>
              {`() {\n`}
              <span style={{ color: '#64748b' }}>
                {'  '}// Declare state: [currentValue, setterFunction]
              </span>
              {`\n  `}
              <span style={{ color: '#c084fc' }}>const</span>
              {` [`}
              <span style={{ color: '#f59e0b' }}>count</span>
              {`, `}
              <span style={{ color: '#ec4899' }}>setCount</span>
              {`] = `}
              <span style={{ color: '#22c55e' }}>useState</span>
              {`(`}
              <span style={{ color: '#3b82f6' }}>0</span>
              {`);`}
              <span style={{ color: '#64748b' }}> // 0 is initial value</span>
              {`\n\n  `}
              <span style={{ color: '#c084fc' }}>return</span>
              {` (\n    <div>\n      <p>Count: {`}
              <span style={{ color: '#f59e0b' }}>count</span>
              {`}</p>\n      <button onClick={() => `}
              <span style={{ color: '#ec4899' }}>setCount</span>
              {`(`}
              <span style={{ color: '#f59e0b' }}>count</span>
              {` + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}`}
            </code>
          </pre>

          {/* Anatomy */}
          <div
            style={{
              marginTop: '1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
            }}
          >
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#0f172a',
                borderRadius: '0.5rem',
                borderTop: '3px solid #f59e0b',
              }}
            >
              <div style={{ color: '#f59e0b', fontWeight: '600', marginBottom: '0.5rem' }}>
                count
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                The current state value. Use this to display data.
              </div>
            </div>
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#0f172a',
                borderRadius: '0.5rem',
                borderTop: '3px solid #ec4899',
              }}
            >
              <div style={{ color: '#ec4899', fontWeight: '600', marginBottom: '0.5rem' }}>
                setCount
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                Function to update state. Calling it triggers a re-render.
              </div>
            </div>
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#0f172a',
                borderRadius: '0.5rem',
                borderTop: '3px solid #3b82f6',
              }}
            >
              <div style={{ color: '#3b82f6', fontWeight: '600', marginBottom: '0.5rem' }}>
                useState(0)
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                The hook call. 0 is the initial value (only used on first render).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key insight */}
      <div
        style={{
          padding: '1rem 1.5rem',
          backgroundColor: '#22c55e22',
          borderTop: '1px solid #22c55e',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>💡</span>
        <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
          Every time you call <code style={{ color: '#ec4899' }}>setCount</code>, React re-renders
          the component with the new value. Try clicking the buttons!
        </span>
      </div>
    </div>
  );
}
