import { useState } from 'react';

export default function PropsBasicsDemo() {
  const [userName, setUserName] = useState('Alice');
  const [userAge, setUserAge] = useState(28);

  return (
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      {/* Controls */}
      <div
        style={{
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          borderBottom: '1px solid #334155',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            name prop
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              backgroundColor: '#0f172a',
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
              color: '#64748b',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            age prop
          </label>
          <input
            type="number"
            value={userAge}
            onChange={(e) => setUserAge(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '0.375rem',
              color: '#f8fafc',
              fontSize: '0.875rem',
            }}
          />
        </div>
      </div>

      {/* Code Display */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}
        >
          Parent Component (passing props)
        </div>
        <pre
          style={{
            margin: 0,
            padding: '1rem',
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            overflow: 'auto',
            fontSize: '0.8rem',
            lineHeight: 1.6,
          }}
        >
          <code style={{ color: '#e2e8f0' }}>
            {`function App() {
  return (
    <UserCard `}
            <span style={{ color: '#3b82f6' }}>name</span>
            {`="`}
            <span style={{ color: '#22c55e' }}>{userName}</span>
            {`" `}
            <span style={{ color: '#3b82f6' }}>age</span>
            {`={`}
            <span style={{ color: '#f59e0b' }}>{userAge}</span>
            {`} />
  );
}`}
          </code>
        </pre>

        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '0.75rem',
            marginTop: '1.5rem',
            textTransform: 'uppercase',
          }}
        >
          Child Component (receiving props)
        </div>
        <pre
          style={{
            margin: 0,
            padding: '1rem',
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            overflow: 'auto',
            fontSize: '0.8rem',
            lineHeight: 1.6,
          }}
        >
          <code style={{ color: '#e2e8f0' }}>
            {`function UserCard(`}
            <span style={{ color: '#ec4899' }}>props</span>
            {`) {
  return (
    <div>
      <h2>Hello, {`}
            <span style={{ color: '#ec4899' }}>props</span>
            {`.`}
            <span style={{ color: '#3b82f6' }}>name</span>
            {`}!</h2>
      <p>Age: {`}
            <span style={{ color: '#ec4899' }}>props</span>
            {`.`}
            <span style={{ color: '#3b82f6' }}>age</span>
            {`}</p>
    </div>
  );
}`}
          </code>
        </pre>
      </div>

      {/* Live Preview */}
      <div style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}
        >
          Live Result
        </div>
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#1e293b',
            borderRadius: '0.5rem',
            border: '1px dashed #334155',
          }}
        >
          {/* This is UserCard with props */}
          <h2 style={{ margin: '0 0 0.5rem 0', color: '#f8fafc', fontSize: '1.25rem' }}>
            Hello, {userName || 'friend'}!
          </h2>
          <p style={{ margin: 0, color: '#94a3b8' }}>Age: {userAge}</p>
        </div>
      </div>

      {/* Visual explanation */}
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
          Props flow <strong style={{ color: '#3b82f6' }}>one way</strong> - from parent to child.
          The child can read props but cannot modify them!
        </span>
      </div>
    </div>
  );
}
