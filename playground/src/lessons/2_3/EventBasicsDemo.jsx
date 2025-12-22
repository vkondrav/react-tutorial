import { useState } from 'react';

export default function EventBasicsDemo() {
  const [clickCount, setClickCount] = useState(0);
  const [lastEvent, setLastEvent] = useState(null);
  const [showCode, setShowCode] = useState(true);

  const handleClick = (e) => {
    if (!e) return;
    setClickCount((prev) => prev + 1);
    setLastEvent({
      type: e.type,
      target: e.target?.tagName || 'Unknown',
      currentTarget: e.currentTarget?.tagName || 'Unknown',
      timestamp: new Date().toLocaleTimeString(),
    });
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
          Click the button to see events in action!
        </div>
        <button
          onClick={handleClick}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '0.5rem',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'transform 0.1s',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Click Me! ({clickCount})
        </button>
        {lastEvent && (
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#0f172a',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: '#94a3b8',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
              LAST EVENT DATA:
            </div>
            <pre style={{ margin: 0, fontSize: '0.75rem', lineHeight: 1.6 }}>
              <code style={{ color: '#94a3b8' }}>
                {`type: "${lastEvent.type}"\ntarget: ${lastEvent.target}\ncurrentTarget: ${lastEvent.currentTarget}\ntime: ${lastEvent.timestamp}`}
              </code>
            </pre>
          </div>
        )}
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
              <span style={{ color: '#c084fc' }}>function</span>
              {` `}
              <span style={{ color: '#3b82f6' }}>Button</span>
              {`() {\n  `}
              <span style={{ color: '#c084fc' }}>const</span>
              {` [count, setCount] = `}
              <span style={{ color: '#22c55e' }}>useState</span>
              {`(0);\n\n  `}
              <span style={{ color: '#64748b' }}>// Event handler function</span>
              {`\n  `}
              <span style={{ color: '#c084fc' }}>const</span>
              {` handleClick = (`}
              <span style={{ color: '#ec4899' }}>e</span>
              {`) => {\n    `}
              <span style={{ color: '#64748b' }}>// e is the SyntheticEvent object</span>
              {`\n    console.log(`}
              <span style={{ color: '#fbbf24' }}>'Clicked!'</span>
              {`, `}
              <span style={{ color: '#ec4899' }}>e</span>
              {`);\n    setCount(count + 1);\n  };\n\n  `}
              <span style={{ color: '#c084fc' }}>return</span>
              {` (\n    <button `}
              <span style={{ color: '#3b82f6' }}>onClick</span>
              {`={`}
              <span style={{ color: '#f59e0b' }}>handleClick</span>
              {`}>\n      Click me\n    </button>\n  );\n}`}
            </code>
          </pre>

          {/* Key Points */}
          <div
            style={{
              marginTop: '1.5rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}
          >
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#0f172a',
                borderRadius: '0.5rem',
                borderLeft: '3px solid #3b82f6',
              }}
            >
              <div style={{ color: '#3b82f6', fontWeight: '600', marginBottom: '0.5rem' }}>
                onClick (camelCase)
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                React uses camelCase for event names. HTML uses lowercase{' '}
                <code style={{ color: '#ef4444' }}>onclick</code>, React uses{' '}
                <code style={{ color: '#22c55e' }}>onClick</code>.
              </div>
            </div>
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#0f172a',
                borderRadius: '0.5rem',
                borderLeft: '3px solid #ec4899',
              }}
            >
              <div style={{ color: '#ec4899', fontWeight: '600', marginBottom: '0.5rem' }}>
                Event Object (e)
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                React wraps native events in a <strong>SyntheticEvent</strong>. Access event data
                via the <code style={{ color: '#ec4899' }}>e</code> parameter.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Common mistake */}
      <div
        style={{
          padding: '1rem 1.5rem',
          backgroundColor: '#ef444422',
          borderTop: '1px solid #ef4444',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>⚠️</span>
        <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
          <strong style={{ color: '#f8fafc' }}>Common mistake:</strong> Don't call the function
          immediately! Use <code style={{ color: '#22c55e' }}>{'onClick={handleClick}'}</code>, not{' '}
          <code style={{ color: '#ef4444' }}>{'onClick={handleClick()}'}</code>
        </span>
      </div>
    </div>
  );
}
