import { useState } from 'react';

export default function DestructuringDemo() {
  const [showDestructured, setShowDestructured] = useState(false);

  return (
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      {/* Toggle */}
      <div style={{ display: 'flex', borderBottom: '1px solid #334155' }}>
        <button
          onClick={() => setShowDestructured(false)}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: !showDestructured ? '#ef444422' : 'transparent',
            border: 'none',
            borderBottom: !showDestructured ? '2px solid #ef4444' : '2px solid transparent',
            color: !showDestructured ? '#ef4444' : '#64748b',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          ❌ Without Destructuring
        </button>
        <button
          onClick={() => setShowDestructured(true)}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: showDestructured ? '#22c55e22' : 'transparent',
            border: 'none',
            borderBottom: showDestructured ? '2px solid #22c55e' : '2px solid transparent',
            color: showDestructured ? '#22c55e' : '#64748b',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          ✅ With Destructuring
        </button>
      </div>

      {/* Code Display */}
      <div style={{ padding: '1.5rem' }}>
        {!showDestructured ? (
          <>
            <pre
              style={{
                margin: 0,
                padding: '1rem',
                backgroundColor: '#0f172a',
                borderRadius: '0.5rem',
                overflow: 'auto',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                border: '1px solid #ef444444',
              }}
            >
              <code style={{ color: '#e2e8f0' }}>
                {`function UserProfile(`}
                <span style={{ color: '#ec4899' }}>props</span>
                {`) {
  return (
    <div>
      <img src={`}
                <span style={{ color: '#ec4899' }}>props</span>
                <span style={{ color: '#64748b' }}>.avatar</span>
                {`} />
      <h2>{`}
                <span style={{ color: '#ec4899' }}>props</span>
                <span style={{ color: '#64748b' }}>.name</span>
                {`}</h2>
      <p>{`}
                <span style={{ color: '#ec4899' }}>props</span>
                <span style={{ color: '#64748b' }}>.bio</span>
                {`}</p>
      <span>{`}
                <span style={{ color: '#ec4899' }}>props</span>
                <span style={{ color: '#64748b' }}>.role</span>
                {`}</span>
    </div>
  );
}`}
              </code>
            </pre>
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#ef444422',
                borderRadius: '0.5rem',
                color: '#ef4444',
                fontSize: '0.875rem',
              }}
            >
              ⚠️ Repetitive! You have to write <code>props.</code> every single time.
            </div>
          </>
        ) : (
          <>
            <pre
              style={{
                margin: 0,
                padding: '1rem',
                backgroundColor: '#0f172a',
                borderRadius: '0.5rem',
                overflow: 'auto',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                border: '1px solid #22c55e44',
              }}
            >
              <code style={{ color: '#e2e8f0' }}>
                {`function UserProfile({ `}
                <span style={{ color: '#3b82f6' }}>avatar</span>
                {`, `}
                <span style={{ color: '#3b82f6' }}>name</span>
                {`, `}
                <span style={{ color: '#3b82f6' }}>bio</span>
                {`, `}
                <span style={{ color: '#3b82f6' }}>role</span>
                {` }) {
  return (
    <div>
      <img src={`}
                <span style={{ color: '#3b82f6' }}>avatar</span>
                {`} />
      <h2>{`}
                <span style={{ color: '#3b82f6' }}>name</span>
                {`}</h2>
      <p>{`}
                <span style={{ color: '#3b82f6' }}>bio</span>
                {`}</p>
      <span>{`}
                <span style={{ color: '#3b82f6' }}>role</span>
                {`}</span>
    </div>
  );
}`}
              </code>
            </pre>
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#22c55e22',
                borderRadius: '0.5rem',
                color: '#22c55e',
                fontSize: '0.875rem',
              }}
            >
              💡 Clean! Props are extracted right in the function parameters.
            </div>
          </>
        )}
      </div>

      {/* Comparison */}
      <div
        style={{
          padding: '1rem 1.5rem',
          backgroundColor: '#0f172a',
          borderTop: '1px solid #334155',
        }}
      >
        <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
          DESTRUCTURING SYNTAX
        </div>
        <pre
          style={{
            margin: 0,
            fontSize: '0.8rem',
            color: '#94a3b8',
          }}
        >
          <code>
            {`// These are equivalent:
function Comp(`}
            <span style={{ color: '#ec4899' }}>props</span>
            {`) { ... `}
            <span style={{ color: '#ec4899' }}>props</span>
            {`.name ... }
function Comp({ `}
            <span style={{ color: '#3b82f6' }}>name</span>
            {` }) { ... `}
            <span style={{ color: '#3b82f6' }}>name</span>
            {` ... }`}
          </code>
        </pre>
      </div>
    </div>
  );
}
