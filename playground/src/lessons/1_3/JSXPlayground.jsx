import { useState } from 'react';

export default function JSXPlayground() {
  const [firstName, setFirstName] = useState('Sarah');
  const [lastName, setLastName] = useState('Chen');
  const [score, setScore] = useState(85);
  const [isOnline, setIsOnline] = useState(true);

  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';
  const gradeColor =
    score >= 90 ? '#22c55e' : score >= 80 ? '#3b82f6' : score >= 70 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '0.25rem',
              color: '#94a3b8',
              fontSize: '0.8125rem',
            }}
          >
            firstName
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '0.25rem',
              color: '#94a3b8',
              fontSize: '0.8125rem',
            }}
          >
            lastName
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '0.25rem',
              color: '#94a3b8',
              fontSize: '0.8125rem',
            }}
          >
            score: {score}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={score}
            onChange={(e) => setScore(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#94a3b8',
            fontSize: '0.8125rem',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={isOnline}
            onChange={(e) => setIsOnline(e.target.checked)}
          />
          isOnline
        </label>
      </div>

      <div
        style={{
          backgroundColor: '#0f172a',
          padding: '1.25rem',
          borderRadius: '0.75rem',
          border: '1px solid #334155',
        }}
      >
        <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '1rem' }}>
          Live Output:
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#1e293b', borderRadius: '0.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: isOnline ? '#22c55e' : '#64748b',
              }}
            />
            <span style={{ fontWeight: '600', color: '#f8fafc' }}>
              {firstName} {lastName}
            </span>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
            Score: {score}/100
            <span
              style={{
                marginLeft: '0.5rem',
                padding: '0.125rem 0.5rem',
                backgroundColor: gradeColor + '33',
                color: gradeColor,
                borderRadius: '0.25rem',
                fontWeight: '600',
              }}
            >
              {grade}
            </span>
          </div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: '#64748b' }}>
            {isOnline ? '🟢 Currently online' : '⚫ Offline'}
          </div>
        </div>
      </div>
    </div>
  );
}
