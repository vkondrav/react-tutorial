import { useState } from 'react';

export default function DefaultPropsDemo() {
  const [showSize, setShowSize] = useState(true);
  const [showVariant, setShowVariant] = useState(true);
  const [size, setSize] = useState('medium');
  const [variant, setVariant] = useState('primary');

  const sizeOptions = ['small', 'medium', 'large'];
  const variantOptions = ['primary', 'secondary', 'danger'];

  const sizeStyles = {
    small: { padding: '0.25rem 0.5rem', fontSize: '0.75rem' },
    medium: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    large: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
  };

  const variantStyles = {
    primary: { backgroundColor: '#3b82f6', color: 'white' },
    secondary: { backgroundColor: '#475569', color: 'white' },
    danger: { backgroundColor: '#ef4444', color: 'white' },
  };

  const activeSize = showSize ? size : 'medium';
  const activeVariant = showVariant ? variant : 'primary';

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
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Size prop */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              <input
                type="checkbox"
                id="showSize"
                checked={showSize}
                onChange={(e) => setShowSize(e.target.checked)}
                style={{ width: '1rem', height: '1rem' }}
              />
              <label htmlFor="showSize" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                Pass <code style={{ color: '#3b82f6' }}>size</code> prop
              </label>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {sizeOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  disabled={!showSize}
                  style={{
                    padding: '0.375rem 0.75rem',
                    backgroundColor: size === s && showSize ? '#3b82f6' : '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '0.375rem',
                    color: size === s && showSize ? 'white' : '#64748b',
                    cursor: showSize ? 'pointer' : 'not-allowed',
                    fontSize: '0.75rem',
                    opacity: showSize ? 1 : 0.5,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Variant prop */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              <input
                type="checkbox"
                id="showVariant"
                checked={showVariant}
                onChange={(e) => setShowVariant(e.target.checked)}
                style={{ width: '1rem', height: '1rem' }}
              />
              <label htmlFor="showVariant" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                Pass <code style={{ color: '#8b5cf6' }}>variant</code> prop
              </label>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {variantOptions.map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  disabled={!showVariant}
                  style={{
                    padding: '0.375rem 0.75rem',
                    backgroundColor: variant === v && showVariant ? '#8b5cf6' : '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '0.375rem',
                    color: variant === v && showVariant ? 'white' : '#64748b',
                    cursor: showVariant ? 'pointer' : 'not-allowed',
                    fontSize: '0.75rem',
                    opacity: showVariant ? 1 : 0.5,
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Code */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}
        >
          Component with Default Props
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
            {`function Button({ 
  label,
  `}
            <span style={{ color: '#3b82f6' }}>size</span>
            {` = `}
            <span style={{ color: '#22c55e' }}>"medium"</span>
            {`,    `}
            <span style={{ color: '#64748b' }}>// ← default value</span>
            {`
  `}
            <span style={{ color: '#8b5cf6' }}>variant</span>
            {` = `}
            <span style={{ color: '#22c55e' }}>"primary"</span>
            {` `}
            <span style={{ color: '#64748b' }}>// ← default value</span>
            {`
}) {
  return <button className={\`btn-\${size} btn-\${variant}\`}>{label}</button>;
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
          Usage
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
            {`<Button label="Click me"`}
            {showSize && (
              <>
                {` `}
                <span style={{ color: '#3b82f6' }}>size</span>
                {`="`}
                <span style={{ color: '#22c55e' }}>{size}</span>
                {`"`}
              </>
            )}
            {showVariant && (
              <>
                {` `}
                <span style={{ color: '#8b5cf6' }}>variant</span>
                {`="`}
                <span style={{ color: '#22c55e' }}>{variant}</span>
                {`"`}
              </>
            )}
            {` />`}
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
            padding: '2rem',
            backgroundColor: '#1e293b',
            borderRadius: '0.5rem',
            border: '1px dashed #334155',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <button
            style={{
              ...sizeStyles[activeSize],
              ...variantStyles[activeVariant],
              border: 'none',
              borderRadius: '0.375rem',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Click me
          </button>
          <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
            size: <span style={{ color: showSize ? '#22c55e' : '#f59e0b' }}>{activeSize}</span>
            {!showSize && <span style={{ color: '#f59e0b' }}> (default)</span>}
            <br />
            variant:{' '}
            <span style={{ color: showVariant ? '#22c55e' : '#f59e0b' }}>{activeVariant}</span>
            {!showVariant && <span style={{ color: '#f59e0b' }}> (default)</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
