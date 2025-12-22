import { useState } from 'react';

export default function StateUpdatesDemo() {
  const [wrongCount, setWrongCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [activeTab, setActiveTab] = useState('batching');

  const handleWrongTripleClick = () => {
    // This won't work as expected!
    setWrongCount(wrongCount + 1);
    setWrongCount(wrongCount + 1);
    setWrongCount(wrongCount + 1);
  };

  const handleRightTripleClick = () => {
    // This works correctly!
    setRightCount((prev) => prev + 1);
    setRightCount((prev) => prev + 1);
    setRightCount((prev) => prev + 1);
  };

  return (
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #334155' }}>
        <button
          onClick={() => setActiveTab('batching')}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: activeTab === 'batching' ? '#0f172a' : 'transparent',
            border: 'none',
            borderBottom: activeTab === 'batching' ? '2px solid #3b82f6' : '2px solid transparent',
            color: activeTab === 'batching' ? '#3b82f6' : '#64748b',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          🔄 Batching Problem
        </button>
        <button
          onClick={() => setActiveTab('functional')}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: activeTab === 'functional' ? '#0f172a' : 'transparent',
            border: 'none',
            borderBottom:
              activeTab === 'functional' ? '2px solid #22c55e' : '2px solid transparent',
            color: activeTab === 'functional' ? '#22c55e' : '#64748b',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          ✅ Functional Updates
        </button>
      </div>

      <div style={{ padding: '1.5rem' }}>
        {activeTab === 'batching' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
                React <strong style={{ color: '#f59e0b' }}>batches</strong> state updates for
                performance. Multiple updates in the same event use the{' '}
                <strong>same starting value</strong>!
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {/* Wrong Way */}
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#0f172a',
                  borderRadius: '0.5rem',
                  border: '1px solid #ef4444',
                }}
              >
                <div style={{ color: '#ef4444', fontSize: '0.75rem', marginBottom: '1rem' }}>
                  ❌ WRONG - Using Current Value
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '0.75rem',
                    backgroundColor: '#1e293b',
                    borderRadius: '0.375rem',
                    fontSize: '0.7rem',
                    lineHeight: 1.6,
                  }}
                >
                  <code style={{ color: '#94a3b8' }}>
                    {`// All three see count = ${wrongCount}!\nsetCount(count + 1); // ${wrongCount} + 1\nsetCount(count + 1); // ${wrongCount} + 1\nsetCount(count + 1); // ${wrongCount} + 1`}
                  </code>
                </pre>
                <div
                  style={{
                    marginTop: '1rem',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#f8fafc',
                    textAlign: 'center',
                    fontFamily: 'monospace',
                  }}
                >
                  {wrongCount}
                </div>
                <button
                  onClick={handleWrongTripleClick}
                  style={{
                    width: '100%',
                    marginTop: '1rem',
                    padding: '0.75rem',
                    backgroundColor: '#ef4444',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  +3 (but only adds 1!)
                </button>
              </div>

              {/* Right Way */}
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#0f172a',
                  borderRadius: '0.5rem',
                  border: '1px solid #22c55e',
                }}
              >
                <div style={{ color: '#22c55e', fontSize: '0.75rem', marginBottom: '1rem' }}>
                  ✅ CORRECT - Using Functional Update
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '0.75rem',
                    backgroundColor: '#1e293b',
                    borderRadius: '0.375rem',
                    fontSize: '0.7rem',
                    lineHeight: 1.6,
                  }}
                >
                  <code style={{ color: '#94a3b8' }}>
                    {`// Each gets latest value!\nsetCount(prev => prev + 1);\nsetCount(prev => prev + 1);\nsetCount(prev => prev + 1);`}
                  </code>
                </pre>
                <div
                  style={{
                    marginTop: '1rem',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#f8fafc',
                    textAlign: 'center',
                    fontFamily: 'monospace',
                  }}
                >
                  {rightCount}
                </div>
                <button
                  onClick={handleRightTripleClick}
                  style={{
                    width: '100%',
                    marginTop: '1rem',
                    padding: '0.75rem',
                    backgroundColor: '#22c55e',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  +3 (actually adds 3!)
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setWrongCount(0);
                setRightCount(0);
              }}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#475569',
                border: 'none',
                borderRadius: '0.375rem',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem',
              }}
            >
              Reset Both
            </button>
          </>
        )}

        {activeTab === 'functional' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
                Use <strong style={{ color: '#22c55e' }}>functional updates</strong> when your new
                state depends on the previous state:
              </p>
            </div>

            <div
              style={{
                padding: '1.5rem',
                backgroundColor: '#0f172a',
                borderRadius: '0.5rem',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  gap: '1rem',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ color: '#ef4444', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    ❌ Direct Value
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      padding: '0.75rem',
                      backgroundColor: '#1e293b',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                    }}
                  >
                    <code style={{ color: '#94a3b8' }}>{`setCount(count + 1)`}</code>
                  </pre>
                </div>
                <div style={{ color: '#64748b', fontSize: '1.5rem' }}>→</div>
                <div>
                  <div style={{ color: '#22c55e', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    ✅ Functional Update
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      padding: '0.75rem',
                      backgroundColor: '#1e293b',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                    }}
                  >
                    <code style={{ color: '#94a3b8' }}>{`setCount(prev => prev + 1)`}</code>
                  </pre>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  WHEN TO USE FUNCTIONAL UPDATES:
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '1.25rem',
                    color: '#94a3b8',
                    fontSize: '0.875rem',
                    lineHeight: 1.8,
                  }}
                >
                  <li>Incrementing/decrementing numbers</li>
                  <li>Toggling booleans</li>
                  <li>Adding/removing from arrays</li>
                  <li>Updating object properties</li>
                </ul>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#1e293b',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                  EXAMPLES:
                </div>
                <pre
                  style={{
                    margin: 0,
                    fontSize: '0.75rem',
                    lineHeight: 1.8,
                    color: '#94a3b8',
                  }}
                >
                  {`// Toggle boolean
setIsOpen(prev => !prev);

// Add to array
setItems(prev => [...prev, newItem]);

// Update object
setUser(prev => ({ ...prev, name: 'New' }));`}
                </pre>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
