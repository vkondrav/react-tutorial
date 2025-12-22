import { useState } from 'react';

export default function EventPropagationDemo() {
  const [parentClicks, setParentClicks] = useState(0);
  const [childClicks, setChildClicks] = useState(0);
  const [stoppedClicks, setStoppedClicks] = useState(0);
  const [log, setLog] = useState([]);

  const addLog = (message) => {
    setLog((prev) => [...prev.slice(-4), message]);
  };

  const handleParentClick = () => {
    setParentClicks((prev) => prev + 1);
    addLog('Parent clicked!');
  };

  const handleChildClick = () => {
    setChildClicks((prev) => prev + 1);
    addLog('Child clicked!');
  };

  const handleStoppedClick = (e) => {
    e.stopPropagation(); // Prevent bubbling to parent
    setStoppedClicks((prev) => prev + 1);
    addLog('Child clicked (propagation stopped)');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    addLog('Form submitted (default prevented)');
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '400px' }}>
        {/* Left: Bubbling Demo */}
        <div style={{ padding: '1.5rem', borderRight: '1px solid #334155' }}>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Event Bubbling (Default Behavior)
          </div>

          {/* Parent with child */}
          <div
            onClick={handleParentClick}
            style={{
              padding: '2rem',
              backgroundColor: '#3b82f622',
              borderRadius: '0.5rem',
              border: '2px solid #3b82f6',
              cursor: 'pointer',
              position: 'relative',
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
              PARENT (click me)
            </div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Clicks: <span style={{ color: '#3b82f6' }}>{parentClicks}</span>
            </div>

            <div
              onClick={handleChildClick}
              style={{
                padding: '1.5rem',
                backgroundColor: '#22c55e22',
                borderRadius: '0.5rem',
                border: '2px solid #22c55e',
                cursor: 'pointer',
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
                CHILD (click me)
              </div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                Clicks: <span style={{ color: '#22c55e' }}>{childClicks}</span>
              </div>
            </div>
          </div>

          {/* Stop propagation example */}
          <div style={{ marginTop: '1.5rem' }}>
            <div
              style={{
                fontSize: '0.75rem',
                color: '#64748b',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
              }}
            >
              With stopPropagation()
            </div>
            <div
              onClick={handleParentClick}
              style={{
                padding: '2rem',
                backgroundColor: '#3b82f622',
                borderRadius: '0.5rem',
                border: '2px solid #3b82f6',
                cursor: 'pointer',
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
                PARENT
              </div>
              <div
                onClick={handleStoppedClick}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#f59e0b22',
                  borderRadius: '0.5rem',
                  border: '2px solid #f59e0b',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#f59e0b',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                  }}
                >
                  CHILD (stops propagation)
                </div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  Clicks: <span style={{ color: '#f59e0b' }}>{stoppedClicks}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              setParentClicks(0);
              setChildClicks(0);
              setStoppedClicks(0);
              setLog([]);
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
            Reset Counts
          </button>
        </div>

        {/* Right: Code & preventDefault */}
        <div style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Code Examples
          </div>

          {/* stopPropagation */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                color: '#f59e0b',
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
                fontWeight: '600',
              }}
            >
              stopPropagation()
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.75rem',
                backgroundColor: '#1e293b',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                lineHeight: 1.6,
              }}
            >
              <code style={{ color: '#94a3b8' }}>
                {'function Child({ onClick }) {\n' +
                  '  const handleClick = (e) => {\n' +
                  '    e.stopPropagation(); // ← Stops event from bubbling\n' +
                  '    onClick();\n' +
                  '  };\n' +
                  '  return <div onClick={handleClick}>Child</div>;\n' +
                  '}'}
              </code>
            </pre>
          </div>

          {/* preventDefault */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                color: '#22c55e',
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
                fontWeight: '600',
              }}
            >
              preventDefault()
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.75rem',
                backgroundColor: '#1e293b',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                lineHeight: 1.6,
              }}
            >
              <code style={{ color: '#94a3b8' }}>
                {'function Form() {\n' +
                  '  const handleSubmit = (e) => {\n' +
                  '    e.preventDefault(); // ← Prevents page refresh\n' +
                  '    // Handle form submission\n' +
                  '  };\n' +
                  '  return <form onSubmit={handleSubmit}>...</form>;\n' +
                  '}'}
              </code>
            </pre>
          </div>

          {/* Live preventDefault demo */}
          <div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
              TRY IT:
            </div>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Type and press Enter"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '0.375rem',
                  color: '#f8fafc',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                }}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#22c55e',
                  border: 'none',
                  borderRadius: '0.375rem',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                Submit (won't refresh!)
              </button>
            </form>
          </div>

          {/* Event log */}
          {log.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                EVENT LOG:
              </div>
              <div
                style={{
                  padding: '0.75rem',
                  backgroundColor: '#1e293b',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  maxHeight: '100px',
                  overflow: 'auto',
                }}
              >
                {log.map((msg, i) => (
                  <div key={i} style={{ marginBottom: '0.25rem' }}>
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Key insight */}
      <div
        style={{
          padding: '1rem 1.5rem',
          backgroundColor: '#3b82f622',
          borderTop: '1px solid #3b82f6',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>💡</span>
        <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
          <strong style={{ color: '#f8fafc' }}>Remember:</strong> Events bubble up (child → parent).
          Use <code style={{ color: '#f59e0b' }}>stopPropagation()</code> to stop bubbling, and{' '}
          <code style={{ color: '#22c55e' }}>preventDefault()</code> to stop default browser
          behavior.
        </span>
      </div>
    </div>
  );
}
