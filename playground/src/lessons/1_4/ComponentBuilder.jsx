import { useState } from 'react';

export default function ComponentBuilder() {
  const [componentName, setComponentName] = useState('MyButton');
  const [buttonText, setButtonText] = useState('Click Me');
  const [buttonColor, setButtonColor] = useState('#3b82f6');

  const isValidName = /^[A-Z][a-zA-Z0-9]*$/.test(componentName);

  const generatedCode = `function ${componentName}() {
  return (
    <button style={{
      padding: '0.75rem 1.5rem',
      backgroundColor: '${buttonColor}',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer'
    }}>
      ${buttonText}
    </button>
  );
}`;

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
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          borderBottom: '1px solid #334155',
        }}
      >
        {/* Component Name */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Component Name
          </label>
          <input
            type="text"
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              backgroundColor: '#0f172a',
              border: `1px solid ${isValidName ? '#334155' : '#ef4444'}`,
              borderRadius: '0.375rem',
              color: '#f8fafc',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
            }}
          />
          {!isValidName && (
            <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
              Must start with capital letter!
            </div>
          )}
        </div>

        {/* Button Text */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Button Text
          </label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
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

        {/* Color Picker */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Button Color
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'].map((color) => (
              <button
                key={color}
                onClick={() => setButtonColor(color)}
                style={{
                  width: '2rem',
                  height: '2rem',
                  backgroundColor: color,
                  border: buttonColor === color ? '2px solid white' : '2px solid transparent',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  boxShadow: buttonColor === color ? '0 0 0 2px #3b82f6' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Code Output */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Generated Component Code
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
          <code style={{ color: '#e2e8f0' }}>{generatedCode}</code>
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
            letterSpacing: '0.05em',
          }}
        >
          Live Preview: {'<'}
          {isValidName ? componentName : 'InvalidName'}
          {' />'}
        </div>
        <div
          style={{
            padding: '2rem',
            backgroundColor: '#1e293b',
            borderRadius: '0.5rem',
            display: 'flex',
            justifyContent: 'center',
            border: '1px dashed #334155',
          }}
        >
          {/* The actual rendered component */}
          <button
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: buttonColor,
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              opacity: isValidName ? 1 : 0.5,
            }}
          >
            {buttonText || 'Button'}
          </button>
        </div>
        {!isValidName && (
          <div
            style={{
              marginTop: '0.75rem',
              padding: '0.5rem 0.75rem',
              backgroundColor: '#ef444422',
              borderRadius: '0.375rem',
              color: '#ef4444',
              fontSize: '0.8rem',
              textAlign: 'center',
            }}
          >
            ⚠️ Component name must start with a capital letter!
          </div>
        )}
      </div>
    </div>
  );
}
