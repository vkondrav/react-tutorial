import { useState } from 'react';

export default function HMRDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <p style={{ lineHeight: 1.8, color: '#94a3b8', marginTop: 0 }}>
        <strong style={{ color: '#f97316' }}>Hot Module Replacement</strong> updates your app
        instantly while preserving state!
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          backgroundColor: '#0f172a',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          marginTop: '1rem',
        }}
      >
        <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.5rem' }}>
          <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
            Counter
          </div>
          <div
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#38bdf8',
              marginBottom: '0.75rem',
            }}
          >
            {count}
          </div>
          <button
            onClick={() => setCount((c) => c + 1)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            +1
          </button>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.5rem' }}>
          <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Input</div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here..."
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '0.375rem',
              color: '#f8fafc',
            }}
          />
        </div>
      </div>
    </div>
  );
}
