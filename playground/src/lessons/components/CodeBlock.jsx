export default function CodeBlock({ title, code, variant }) {
  const borderColor = variant === 'good' ? '#22c55e' : '#ef4444';
  const icon = variant === 'good' ? '✓' : '✗';

  return (
    <div
      style={{
        backgroundColor: '#0f172a',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        border: `1px solid ${borderColor}33`,
      }}
    >
      <div
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: `${borderColor}22`,
          borderBottom: `1px solid ${borderColor}33`,
          fontSize: '0.75rem',
          fontWeight: '600',
          color: borderColor,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span>{icon}</span>
        {title}
      </div>
      <pre
        style={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.75rem',
          lineHeight: '1.6',
          color: '#cbd5e1',
          overflow: 'auto',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
