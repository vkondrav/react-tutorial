import { useState } from 'react';

export default function VirtualDomDemo() {
  const [name, setName] = useState('World');
  const [updates, setUpdates] = useState(0);

  const handleChange = (e) => {
    setName(e.target.value);
    setUpdates((prev) => prev + 1);
  };

  return (
    <div>
      <p style={{ lineHeight: 1.8, color: '#94a3b8', marginTop: 0 }}>
        React uses a <strong style={{ color: '#38bdf8' }}>Virtual DOM</strong> - when state changes,
        React only updates what actually changed.
      </p>
      <div
        style={{
          backgroundColor: '#0f172a',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          marginTop: '1rem',
        }}
      >
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Type your name"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            color: '#f8fafc',
            fontSize: '1rem',
            marginBottom: '1rem',
          }}
        />
        <div style={{ padding: '1rem', backgroundColor: '#1e293b', borderRadius: '0.5rem' }}>
          <p style={{ margin: 0, fontSize: '1.25rem' }}>
            Hello, <span style={{ color: '#38bdf8', fontWeight: '600' }}>{name || '...'}</span>! 👋
          </p>
        </div>
        <div style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '1rem' }}>
          DOM updates: <strong style={{ color: '#22c55e' }}>{updates}</strong>
        </div>
      </div>
    </div>
  );
}
