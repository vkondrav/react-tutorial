import { useState } from 'react';

export default function StateVsPropsDemo() {
  const [parentColor, setParentColor] = useState('#3b82f6');

  return (
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      {/* Comparison Table */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th
                style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  color: '#64748b',
                  fontSize: '0.75rem',
                  borderBottom: '1px solid #334155',
                }}
              ></th>
              <th
                style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  color: '#3b82f6',
                  fontSize: '0.875rem',
                  borderBottom: '1px solid #334155',
                }}
              >
                Props
              </th>
              <th
                style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  color: '#22c55e',
                  fontSize: '0.875rem',
                  borderBottom: '1px solid #334155',
                }}
              >
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Owned by', 'Parent component', 'The component itself'],
              ['Can change?', 'No (read-only)', 'Yes (via setter)'],
              ['Passed from', 'Parent → Child', 'Created internally'],
              ['Purpose', 'Configure component', 'Track changing data'],
              ['Triggers re-render', 'When parent changes', 'When setter called'],
            ].map(([label, props, state], i) => (
              <tr key={i}>
                <td style={{ padding: '0.75rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                  {label}
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    color: '#3b82f6',
                    fontSize: '0.875rem',
                    backgroundColor: '#3b82f611',
                  }}
                >
                  {props}
                </td>
                <td
                  style={{
                    padding: '0.75rem',
                    color: '#22c55e',
                    fontSize: '0.875rem',
                    backgroundColor: '#22c55e11',
                  }}
                >
                  {state}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive Demo */}
      <div style={{ padding: '1.5rem' }}>
        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '1rem',
            textTransform: 'uppercase',
          }}
        >
          Interactive Example: Props vs State
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Parent (has state) */}
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#0f172a',
              borderRadius: '0.5rem',
              border: '2px solid #22c55e',
            }}
          >
            <div
              style={{
                color: '#22c55e',
                fontSize: '0.75rem',
                marginBottom: '1rem',
                fontWeight: '600',
              }}
            >
              PARENT COMPONENT (owns state)
            </div>
            <pre
              style={{
                margin: 0,
                fontSize: '0.75rem',
                color: '#94a3b8',
                lineHeight: 1.6,
              }}
            >
              {`const [color, setColor] = useState('${parentColor}');`}
            </pre>
            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>
                Change state:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['#3b82f6', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setParentColor(color)}
                    style={{
                      width: '2rem',
                      height: '2rem',
                      backgroundColor: color,
                      border: parentColor === color ? '2px solid white' : 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
            <div
              style={{
                marginTop: '1rem',
                padding: '0.5rem',
                backgroundColor: '#1e293b',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
              }}
            >
              <code style={{ color: '#e2e8f0' }}>
                {`<ChildComponent `}
                <span style={{ color: '#3b82f6' }}>color</span>
                {`={`}
                <span style={{ color: '#22c55e' }}>color</span>
                {`} />`}
              </code>
            </div>
          </div>

          {/* Child (receives props) */}
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#0f172a',
              borderRadius: '0.5rem',
              border: '2px solid #3b82f6',
            }}
          >
            <div
              style={{
                color: '#3b82f6',
                fontSize: '0.75rem',
                marginBottom: '1rem',
                fontWeight: '600',
              }}
            >
              CHILD COMPONENT (receives props)
            </div>
            <pre
              style={{
                margin: 0,
                fontSize: '0.75rem',
                color: '#94a3b8',
                lineHeight: 1.6,
              }}
            >
              {`function Child({ color }) {
  // Can READ color
  // Cannot CHANGE color
}`}
            </pre>
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: parentColor,
                borderRadius: '0.5rem',
                color: 'white',
                textAlign: 'center',
                fontWeight: '600',
              }}
            >
              My color is: {parentColor}
            </div>
            <div
              style={{
                marginTop: '0.75rem',
                color: '#64748b',
                fontSize: '0.7rem',
                textAlign: 'center',
              }}
            >
              ↑ Color comes from parent's state as a prop
            </div>
          </div>
        </div>
      </div>

      {/* Key insight */}
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
        <span style={{ fontSize: '1.25rem' }}>🔑</span>
        <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
          <strong style={{ color: '#f8fafc' }}>Rule of thumb:</strong> If data needs to change, use{' '}
          <strong style={{ color: '#22c55e' }}>state</strong>. If data is passed from parent, it's{' '}
          <strong style={{ color: '#3b82f6' }}>props</strong>.
        </span>
      </div>
    </div>
  );
}
