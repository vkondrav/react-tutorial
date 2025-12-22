import { useState } from 'react';

export default function EventTypesDemo() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('option1');
  const [isChecked, setIsChecked] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 2000);
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          padding: '1.5rem',
        }}
      >
        {/* Left: Event Examples */}
        <div>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Interactive Examples
          </div>

          {/* onChange - Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                color: '#94a3b8',
                marginBottom: '0.5rem',
              }}
            >
              <code style={{ color: '#3b82f6' }}>onChange</code> - Text Input
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type something..."
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '0.375rem',
                color: '#f8fafc',
                fontSize: '0.875rem',
              }}
            />
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
              Value: <span style={{ color: '#22c55e' }}>"{inputValue}"</span>
            </div>
          </div>

          {/* onChange - Select */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                color: '#94a3b8',
                marginBottom: '0.5rem',
              }}
            >
              <code style={{ color: '#3b82f6' }}>onChange</code> - Select Dropdown
            </label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '0.375rem',
                color: '#f8fafc',
                fontSize: '0.875rem',
              }}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
              Selected: <span style={{ color: '#22c55e' }}>{selectedOption}</span>
            </div>
          </div>

          {/* onChange - Checkbox */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: '#94a3b8',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                style={{ width: '1rem', height: '1rem' }}
              />
              <code style={{ color: '#3b82f6' }}>onChange</code> - Checkbox
            </label>
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
              Checked: <span style={{ color: '#f59e0b' }}>{isChecked.toString()}</span>
            </div>
          </div>

          {/* onSubmit - Form */}
          <div>
            <form onSubmit={handleSubmit}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  marginBottom: '0.5rem',
                }}
              >
                <code style={{ color: '#3b82f6' }}>onSubmit</code> - Form Submission
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Enter name"
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '0.375rem',
                    color: '#f8fafc',
                    fontSize: '0.875rem',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#22c55e',
                    border: 'none',
                    borderRadius: '0.375rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  Submit
                </button>
              </div>
              {formSubmitted && (
                <div
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    backgroundColor: '#22c55e22',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    color: '#22c55e',
                  }}
                >
                  ✓ Form submitted! (preventDefault prevented page refresh)
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right: Event Reference */}
        <div>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Common Event Types
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#0f172a',
              borderRadius: '0.5rem',
              fontSize: '0.8rem',
              lineHeight: 1.8,
            }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <code style={{ color: '#3b82f6' }}>onClick</code>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                Button clicks, div clicks, etc.
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <code style={{ color: '#3b82f6' }}>onChange</code>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                Input, select, textarea changes
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <code style={{ color: '#3b82f6' }}>onSubmit</code>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                Form submission (use preventDefault!)
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <code style={{ color: '#3b82f6' }}>onFocus</code> /{' '}
              <code style={{ color: '#3b82f6' }}>onBlur</code>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                When input gains/loses focus
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <code style={{ color: '#3b82f6' }}>onMouseEnter</code> /{' '}
              <code style={{ color: '#3b82f6' }}>onMouseLeave</code>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                Mouse hover events
              </div>
            </div>
            <div>
              <code style={{ color: '#3b82f6' }}>onKeyDown</code> /{' '}
              <code style={{ color: '#3b82f6' }}>onKeyUp</code>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                Keyboard key presses
              </div>
            </div>
          </div>

          {/* Mouse position demo */}
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#0f172a',
              borderRadius: '0.5rem',
              border: '1px dashed #334155',
            }}
            onMouseMove={handleMouseMove}
          >
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
              Hover here for <code style={{ color: '#3b82f6' }}>onMouseMove</code>:
            </div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
              X: <span style={{ color: '#22c55e' }}>{mousePosition.x}</span> Y:{' '}
              <span style={{ color: '#22c55e' }}>{mousePosition.y}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
