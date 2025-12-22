import { useState } from 'react';

export default function LogicalAndDemo() {
  const [notifications, setNotifications] = useState(3);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        marginTop: '1rem',
      }}
    >
      {/* Interactive Controls */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Notification Counter */}
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            padding: '1rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
            Notifications
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setNotifications(Math.max(0, notifications - 1))}
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#334155',
                border: 'none',
                borderRadius: '0.375rem',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.25rem',
              }}
            >
              −
            </button>
            <span
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                minWidth: '2rem',
                textAlign: 'center',
                color: notifications > 0 ? '#22c55e' : '#64748b',
              }}
            >
              {notifications}
            </span>
            <button
              onClick={() => setNotifications(notifications + 1)}
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#334155',
                border: 'none',
                borderRadius: '0.375rem',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.25rem',
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Admin Toggle */}
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            padding: '1rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
            Admin Status
          </div>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: isAdmin ? '#8b5cf6' : '#334155',
              border: 'none',
              borderRadius: '0.375rem',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {isAdmin ? '👑 Admin' : '👤 User'}
          </button>
        </div>

        {/* Error Toggle */}
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            padding: '1rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
            Error State
          </div>
          <button
            onClick={() => setHasError(!hasError)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: hasError ? '#ef4444' : '#334155',
              border: 'none',
              borderRadius: '0.375rem',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {hasError ? '❌ Error' : '✓ No Error'}
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div
        style={{
          backgroundColor: '#0f172a',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          border: '2px solid #3b82f6',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            color: '#3b82f6',
            marginBottom: '1rem',
            fontWeight: '600',
          }}
        >
          🎬 LIVE RESULT
        </div>

        {/* Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            backgroundColor: '#1e293b',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <span style={{ fontWeight: '600' }}>Dashboard</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Admin badge only shows for admins */}
            {isAdmin && (
              <span
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#8b5cf6',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                }}
              >
                👑 ADMIN
              </span>
            )}

            {/* Notification badge only shows when > 0 */}
            <div style={{ position: 'relative' }}>
              <span style={{ fontSize: '1.25rem' }}>🔔</span>
              {notifications > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-8px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    fontSize: '0.625rem',
                    fontWeight: '700',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '9999px',
                    minWidth: '16px',
                    textAlign: 'center',
                  }}
                >
                  {notifications > 99 ? '99+' : notifications}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Error Message only shows when error */}
        {hasError && (
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#7f1d1d',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <span>⚠️</span>
            <span>Something went wrong. Please try again.</span>
          </div>
        )}

        {/* Admin Panel only shows for admins */}
        {isAdmin && (
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#3b0764',
              borderRadius: '0.5rem',
              border: '1px dashed #8b5cf6',
            }}
          >
            <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#c4b5fd' }}>
              🔧 Admin Panel
            </div>
            <div style={{ fontSize: '0.875rem', color: '#a78bfa' }}>
              Secret admin controls appear here...
            </div>
          </div>
        )}

        {/* Empty state message */}
        {!isAdmin && !hasError && notifications === 0 && (
          <div
            style={{
              padding: '1rem',
              textAlign: 'center',
              color: '#64748b',
              fontStyle: 'italic',
            }}
          >
            All caught up! No notifications. 🎉
          </div>
        )}
      </div>

      {/* Code Examples */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            padding: '1rem',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              color: '#22c55e',
              marginBottom: '0.5rem',
              fontWeight: '600',
            }}
          >
            ✓ GOOD
          </div>
          <pre
            style={{
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: '#64748b' }}>{'// Show only if true'}</span>
            {'\n'}
            <span style={{ color: '#c084fc' }}>{'{'}</span>
            <span style={{ color: '#f8fafc' }}>isAdmin </span>
            <span style={{ color: '#f59e0b' }}>&& </span>
            <span style={{ color: '#22c55e' }}>&lt;AdminPanel /&gt;</span>
            <span style={{ color: '#c084fc' }}>{'}'}</span>
          </pre>
        </div>

        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            padding: '1rem',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              color: '#ef4444',
              marginBottom: '0.5rem',
              fontWeight: '600',
            }}
          >
            ⚠️ GOTCHA
          </div>
          <pre
            style={{
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: '#64748b' }}>{'// 0 will render as "0"!'}</span>
            {'\n'}
            <span style={{ color: '#c084fc' }}>{'{'}</span>
            <span style={{ color: '#f8fafc' }}>count </span>
            <span style={{ color: '#f59e0b' }}>&& </span>
            <span style={{ color: '#22c55e' }}>&lt;Badge /&gt;</span>
            <span style={{ color: '#c084fc' }}>{'}'}</span>
            <span style={{ color: '#64748b' }}>{' // if count=0'}</span>
          </pre>
        </div>

        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            padding: '1rem',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              color: '#3b82f6',
              marginBottom: '0.5rem',
              fontWeight: '600',
            }}
          >
            ✓ FIX FOR NUMBERS
          </div>
          <pre
            style={{
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: '#64748b' }}>{'// Use > 0 for numbers'}</span>
            {'\n'}
            <span style={{ color: '#c084fc' }}>{'{'}</span>
            <span style={{ color: '#f8fafc' }}>count </span>
            <span style={{ color: '#f59e0b' }}>&gt; 0 && </span>
            <span style={{ color: '#22c55e' }}>&lt;Badge /&gt;</span>
            <span style={{ color: '#c084fc' }}>{'}'}</span>
          </pre>
        </div>
      </div>

      {/* Explanation */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#1e3a5f',
          borderRadius: '0.5rem',
          borderLeft: '4px solid #3b82f6',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#38bdf8' }}>
          💡 Why && Works
        </div>
        <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#94a3b8' }}>
          JavaScript's <code style={{ color: '#f59e0b' }}>&&</code> returns the first falsy value OR
          the last value. So <code>true && &lt;Component /&gt;</code> returns{' '}
          <code>&lt;Component /&gt;</code>, while <code>false && &lt;Component /&gt;</code> returns{' '}
          <code>false</code> (which React ignores).
          <br />
          <br />
          <strong style={{ color: '#fcd34d' }}>⚠️ Gotcha:</strong> <code>0 && &lt;X /&gt;</code>{' '}
          renders <code>"0"</code> because 0 is falsy but still a number React will display!
        </div>
      </div>
    </div>
  );
}
