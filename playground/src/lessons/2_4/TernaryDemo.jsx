import { useState } from 'react';

export default function TernaryDemo() {
  const [theme, setTheme] = useState('light');
  const [status, setStatus] = useState('online');

  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        marginTop: '1rem',
      }}
    >
      {/* Example 1: Theme Toggle */}
      <div style={{ marginBottom: '2rem' }}>
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#94a3b8',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Example 1: Theme Toggle
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: theme === 'light' ? '#fef3c7' : '#1e293b',
              border: `2px solid ${theme === 'light' ? '#f59e0b' : '#64748b'}`,
              borderRadius: '0.5rem',
              color: theme === 'light' ? '#92400e' : '#e2e8f0',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
          </button>

          {/* Result Box */}
          <div
            style={{
              padding: '1rem 1.5rem',
              backgroundColor: theme === 'light' ? '#f8fafc' : '#0f172a',
              color: theme === 'light' ? '#1e293b' : '#f8fafc',
              borderRadius: '0.5rem',
              border: `1px solid ${theme === 'light' ? '#e2e8f0' : '#334155'}`,
              transition: 'all 0.3s',
            }}
          >
            {theme === 'light' ? (
              <span>🌻 Bright and sunny!</span>
            ) : (
              <span>✨ Easy on the eyes!</span>
            )}
          </div>
        </div>

        {/* Code */}
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginTop: '1rem',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: '#64748b' }}>{'// Style changes based on condition'}</span>
          <br />
          <span style={{ color: '#c084fc' }}>backgroundColor: </span>
          <span style={{ color: '#f8fafc' }}>theme === </span>
          <span style={{ color: '#a5f3fc' }}>'light'</span>
          <span style={{ color: '#f59e0b' }}> ? </span>
          <span style={{ color: '#a5f3fc' }}>'#f8fafc'</span>
          <span style={{ color: '#f59e0b' }}> : </span>
          <span style={{ color: '#a5f3fc' }}>'#0f172a'</span>
        </div>
      </div>

      {/* Example 2: User Status */}
      <div>
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#94a3b8',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Example 2: User Status Badge
        </div>

        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {['online', 'away', 'busy', 'offline'].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: status === s ? '#3b82f6' : '#0f172a',
                border: `1px solid ${status === s ? '#3b82f6' : '#475569'}`,
                borderRadius: '0.375rem',
                color: status === s ? 'white' : '#94a3b8',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontSize: '0.875rem',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Status Display */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              position: 'relative',
            }}
          >
            👤
            <div
              style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '2px solid #0f172a',
                backgroundColor:
                  status === 'online'
                    ? '#22c55e'
                    : status === 'away'
                      ? '#f59e0b'
                      : status === 'busy'
                        ? '#ef4444'
                        : '#64748b',
              }}
            />
          </div>
          <div>
            <div style={{ fontWeight: '600' }}>Alex Developer</div>
            <div
              style={{
                fontSize: '0.875rem',
                color:
                  status === 'online'
                    ? '#22c55e'
                    : status === 'away'
                      ? '#f59e0b'
                      : status === 'busy'
                        ? '#ef4444'
                        : '#64748b',
              }}
            >
              {status === 'online'
                ? '🟢 Available'
                : status === 'away'
                  ? '🟡 Away'
                  : status === 'busy'
                    ? '🔴 Do not disturb'
                    : '⚫ Offline'}
            </div>
          </div>
        </div>

        {/* Code */}
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginTop: '1rem',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: '#64748b' }}>{'// Nested ternaries (use sparingly!)'}</span>
          <br />
          <span style={{ color: '#f8fafc' }}>status === </span>
          <span style={{ color: '#a5f3fc' }}>'online'</span>
          <span style={{ color: '#f59e0b' }}> ? </span>
          <span style={{ color: '#a5f3fc' }}>'🟢 Available'</span>
          <span style={{ color: '#f59e0b' }}> :</span>
          <br />
          <span style={{ color: '#f8fafc' }}>status === </span>
          <span style={{ color: '#a5f3fc' }}>'away'</span>
          <span style={{ color: '#f59e0b' }}> ? </span>
          <span style={{ color: '#a5f3fc' }}>'🟡 Away'</span>
          <span style={{ color: '#f59e0b' }}> :</span>
          <br />
          <span style={{ color: '#f59e0b' }}>...</span>
        </div>
      </div>

      {/* Warning */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#451a03',
          borderRadius: '0.5rem',
          borderLeft: '4px solid #f59e0b',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#fcd34d' }}>
          ⚠️ Watch Out for Nested Ternaries!
        </div>
        <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#fde68a' }}>
          While nested ternaries work, they can get hard to read quickly. For many conditions,
          consider extracting to a variable or using early returns instead!
        </div>
      </div>
    </div>
  );
}
