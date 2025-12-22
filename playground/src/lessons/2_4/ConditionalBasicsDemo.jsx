import { useState } from 'react';

export default function ConditionalBasicsDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCode, setShowCode] = useState(true);

  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        marginTop: '1rem',
      }}
    >
      {/* Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: isLoggedIn ? '#ef4444' : '#22c55e',
            border: 'none',
            borderRadius: '0.5rem',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {isLoggedIn ? '🚪 Log Out' : '🔑 Log In'}
        </button>

        <div
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
          }}
        >
          isLoggedIn ={' '}
          <span style={{ color: isLoggedIn ? '#22c55e' : '#ef4444' }}>{String(isLoggedIn)}</span>
        </div>
      </div>

      {/* Live Result */}
      <div
        style={{
          backgroundColor: '#0f172a',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '1rem',
          border: '2px solid #3b82f6',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            color: '#3b82f6',
            marginBottom: '0.75rem',
            fontWeight: '600',
          }}
        >
          🎬 LIVE RESULT
        </div>

        {/* This is the conditional rendering in action! */}
        <div
          style={{
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          {isLoggedIn ? (
            <>
              <span style={{ fontSize: '1.5rem' }}>👋</span>
              <span>
                Welcome back, <strong style={{ color: '#22c55e' }}>User!</strong>
              </span>
            </>
          ) : (
            <>
              <span style={{ fontSize: '1.5rem' }}>🔐</span>
              <span>
                Please <strong style={{ color: '#f59e0b' }}>log in</strong> to continue
              </span>
            </>
          )}
        </div>
      </div>

      {/* Toggle Code View */}
      <button
        onClick={() => setShowCode(!showCode)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: 'transparent',
          border: '1px solid #475569',
          borderRadius: '0.375rem',
          color: '#94a3b8',
          cursor: 'pointer',
          fontSize: '0.875rem',
          marginBottom: showCode ? '1rem' : 0,
        }}
      >
        {showCode ? '▼ Hide Code' : '▶ Show Code'}
      </button>

      {/* Code Explanation */}
      {showCode && (
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            padding: '1rem',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            overflow: 'auto',
          }}
        >
          <div style={{ color: '#64748b' }}>
            {'// Using ternary operator for conditional rendering'}
          </div>
          <div>
            <span style={{ color: '#c084fc' }}>{'{'}</span>
            <span style={{ color: '#f8fafc' }}>isLoggedIn </span>
            <span style={{ color: '#f59e0b' }}>? </span>
            <span style={{ color: '#94a3b8' }}>{'('}</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: '#22c55e' }}>&lt;WelcomeMessage /&gt;</span>
          </div>
          <div>
            <span style={{ color: '#94a3b8' }}>{')'}</span>
            <span style={{ color: '#f59e0b' }}> : </span>
            <span style={{ color: '#94a3b8' }}>{'('}</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: '#ef4444' }}>&lt;LoginPrompt /&gt;</span>
          </div>
          <div>
            <span style={{ color: '#94a3b8' }}>{')'}</span>
            <span style={{ color: '#c084fc' }}>{'}'}</span>
          </div>
        </div>
      )}

      {/* Explanation */}
      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#1e3a5f',
          borderRadius: '0.5rem',
          borderLeft: '4px solid #3b82f6',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#38bdf8' }}>
          💡 How it works
        </div>
        <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#94a3b8' }}>
          The <code style={{ color: '#f59e0b' }}>?</code> is called the{' '}
          <strong>ternary operator</strong>. It works like:{' '}
          <code>condition ? valueIfTrue : valueIfFalse</code>. Inside JSX, we use it to choose
          between different elements to render!
        </div>
      </div>
    </div>
  );
}
