import { useState } from 'react';

export default function ComponentBasicsDemo() {
  const [syntax, setSyntax] = useState('function');

  const syntaxExamples = {
    function: {
      label: 'Function Declaration',
      code: `function Greeting() {
  return <h1>Hello, World!</h1>;
}`,
      description: 'The classic way - clear and readable',
    },
    arrow: {
      label: 'Arrow Function',
      code: `const Greeting = () => {
  return <h1>Hello, World!</h1>;
};`,
      description: 'Modern syntax - popular in the community',
    },
    arrowImplicit: {
      label: 'Arrow (Implicit Return)',
      code: `const Greeting = () => <h1>Hello, World!</h1>;`,
      description: 'Shortest syntax - great for simple components',
    },
  };

  const current = syntaxExamples[syntax];

  return (
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      {/* Syntax Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #334155',
        }}
      >
        {Object.entries(syntaxExamples).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setSyntax(key)}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              backgroundColor: syntax === key ? '#334155' : 'transparent',
              border: 'none',
              borderBottom: syntax === key ? '2px solid #3b82f6' : '2px solid transparent',
              color: syntax === key ? '#f8fafc' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: syntax === key ? '600' : '400',
              transition: 'all 0.2s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div style={{ padding: '1.5rem' }}>
        <pre
          style={{
            margin: 0,
            padding: '1rem',
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            overflow: 'auto',
            fontSize: '0.875rem',
            lineHeight: 1.6,
          }}
        >
          <code style={{ color: '#e2e8f0' }}>{current.code}</code>
        </pre>

        <p
          style={{
            marginTop: '1rem',
            marginBottom: 0,
            color: '#94a3b8',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ color: '#22c55e' }}>💡</span>
          {current.description}
        </p>
      </div>

      {/* Live Preview */}
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#0f172a',
          borderTop: '1px solid #334155',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Preview
        </div>
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#1e293b',
            borderRadius: '0.5rem',
            border: '1px dashed #334155',
          }}
        >
          {/* This IS the Greeting component rendered! */}
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#f8fafc' }}>Hello, World!</h1>
        </div>
      </div>
    </div>
  );
}
