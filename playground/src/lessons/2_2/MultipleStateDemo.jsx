import { useState } from 'react';

export default function MultipleStateDemo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '350px' }}>
        {/* Code */}
        <div style={{ padding: '1.5rem', borderRight: '1px solid #334155' }}>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Each useState = One Piece of State
          </div>
          <pre
            style={{
              margin: 0,
              padding: '1rem',
              backgroundColor: '#0f172a',
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '0.75rem',
              lineHeight: 1.8,
            }}
          >
            <code style={{ color: '#e2e8f0' }}>
              <span style={{ color: '#c084fc' }}>function</span>
              {` SignupForm() {\n  `}
              <span style={{ color: '#64748b' }}>// Three separate state values</span>
              {`\n  `}
              <span style={{ color: '#c084fc' }}>const</span>
              {` [name, setName] = useState(`}
              <span style={{ color: '#fbbf24' }}>''</span>
              {`);\n  `}
              <span style={{ color: '#c084fc' }}>const</span>
              {` [email, setEmail] = useState(`}
              <span style={{ color: '#fbbf24' }}>''</span>
              {`);\n  `}
              <span style={{ color: '#c084fc' }}>const</span>
              {` [subscribed, setSubscribed] = useState(`}
              <span style={{ color: '#f59e0b' }}>false</span>
              {`);\n\n  `}
              <span style={{ color: '#c084fc' }}>return</span>
              {` (\n    <form>\n      <input\n        value={name}\n        onChange={e => setName(e.target.value)}\n      />\n      <input\n        value={email}\n        onChange={e => setEmail(e.target.value)}\n      />\n      <input\n        type="checkbox"\n        checked={subscribed}\n        onChange={e => setSubscribed(e.target.checked)}\n      />\n    </form>\n  );\n}`}
            </code>
          </pre>
        </div>

        {/* Live Form */}
        <div style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Live Demo - Try Typing!
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  marginBottom: '0.25rem',
                }}
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '0.375rem',
                  color: '#f8fafc',
                  fontSize: '0.875rem',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  marginBottom: '0.25rem',
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '0.375rem',
                  color: '#f8fafc',
                  fontSize: '0.875rem',
                }}
              />
            </div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#94a3b8',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={subscribed}
                onChange={(e) => setSubscribed(e.target.checked)}
                style={{ width: '1rem', height: '1rem' }}
              />
              Subscribe to newsletter
            </label>
          </div>

          {/* Current State */}
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#1e293b',
              borderRadius: '0.5rem',
            }}
          >
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>
              CURRENT STATE VALUES
            </div>
            <pre
              style={{
                margin: 0,
                fontSize: '0.75rem',
                color: '#94a3b8',
                lineHeight: 1.6,
              }}
            >
              {`name: `}
              <span style={{ color: '#22c55e' }}>"{name}"</span>
              {`\nemail: `}
              <span style={{ color: '#22c55e' }}>"{email}"</span>
              {`\nsubscribed: `}
              <span style={{ color: '#f59e0b' }}>{subscribed.toString()}</span>
            </pre>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div
        style={{
          padding: '1rem 1.5rem',
          backgroundColor: '#8b5cf622',
          borderTop: '1px solid #8b5cf6',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>💡</span>
        <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
          <strong style={{ color: '#8b5cf6' }}>Pro tip:</strong> Keep related state together. For
          complex forms, consider grouping into an object (we'll cover this in advanced patterns).
        </span>
      </div>
    </div>
  );
}
