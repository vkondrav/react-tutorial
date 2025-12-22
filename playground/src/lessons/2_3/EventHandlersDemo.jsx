import { useState } from 'react';

export default function EventHandlersDemo() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [activeTab, setActiveTab] = useState('inline');

  return (
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #334155' }}>
        {[
          { id: 'inline', label: 'Inline Arrow' },
          { id: 'function', label: 'Function Reference' },
          { id: 'arguments', label: 'Passing Arguments' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: activeTab === tab.id ? '#0f172a' : 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeTab === tab.id ? '#3b82f6' : '#64748b',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '1.5rem' }}>
        {activeTab === 'inline' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
                Define the handler function directly in JSX using an arrow function:
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  CODE:
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '1rem',
                    backgroundColor: '#0f172a',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    lineHeight: 1.8,
                  }}
                >
                  <code style={{ color: '#e2e8f0' }}>
                    {'<button onClick={() => {\n' +
                      '  setCount(count + 1);\n' +
                      '}}>\n' +
                      '  Click me\n' +
                      '</button>'}
                  </code>
                </pre>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  LIVE:
                </div>
                <button
                  onClick={() => setCount1((prev) => prev + 1)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: '#3b82f6',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                  }}
                >
                  Click me ({count1})
                </button>
              </div>
            </div>
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#3b82f622',
                borderRadius: '0.5rem',
                color: '#94a3b8',
                fontSize: '0.8rem',
              }}
            >
              ✅ <strong>Good for:</strong> Simple, one-line handlers. Easy to read.
            </div>
          </>
        )}

        {activeTab === 'function' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
                Define the handler function separately, then pass the reference:
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  CODE:
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '1rem',
                    backgroundColor: '#0f172a',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    lineHeight: 1.8,
                  }}
                >
                  <code style={{ color: '#e2e8f0' }}>
                    {'const handleClick = () => {\n' +
                      '  setCount(count + 1);\n' +
                      '};\n\n' +
                      'return (\n' +
                      '  <button onClick={handleClick}>\n' +
                      '    Click me\n' +
                      '  </button>\n' +
                      ');'}
                  </code>
                </pre>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  LIVE:
                </div>
                <button
                  onClick={() => {
                    const handleClick = () => setCount2((prev) => prev + 1);
                    handleClick();
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: '#22c55e',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                  }}
                >
                  Click me ({count2})
                </button>
              </div>
            </div>
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#22c55e22',
                borderRadius: '0.5rem',
                color: '#94a3b8',
                fontSize: '0.8rem',
              }}
            >
              ✅ <strong>Good for:</strong> Reusable handlers, complex logic, better performance
              (function isn't recreated on each render).
            </div>
          </>
        )}

        {activeTab === 'arguments' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
                To pass arguments to an event handler, wrap it in an arrow function:
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  CODE:
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '1rem',
                    backgroundColor: '#0f172a',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    lineHeight: 1.8,
                  }}
                >
                  <code style={{ color: '#e2e8f0' }}>
                    {'const handleDelete = (id) => {\n' +
                      "  console.log('Deleting', id);\n" +
                      '};\n\n' +
                      'return (\n' +
                      '  <button onClick={() => handleDelete(123)}>\n' +
                      '    Delete Item 123\n' +
                      '  </button>\n' +
                      ');'}
                  </code>
                </pre>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  LIVE:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[1, 2, 3].map((id) => (
                    <button
                      key={id}
                      onClick={() => {
                        setCount3((prev) => prev + id);
                        console.log('Clicked item', id);
                      }}
                      style={{
                        padding: '0.75rem',
                        backgroundColor: '#8b5cf6',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                      }}
                    >
                      Delete Item {id} (check console)
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#64748b' }}>
                  Total: <span style={{ color: '#8b5cf6' }}>{count3}</span>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#8b5cf622',
                borderRadius: '0.5rem',
                color: '#94a3b8',
                fontSize: '0.8rem',
              }}
            >
              ✅ <strong>Pattern:</strong>{' '}
              <code style={{ color: '#8b5cf6' }}>{'onClick={() => handleDelete(id)}'}</code> - wrap
              in arrow function to pass arguments.
            </div>
          </>
        )}
      </div>

      {/* Common mistakes */}
      <div
        style={{
          padding: '1rem 1.5rem',
          backgroundColor: '#ef444422',
          borderTop: '1px solid #ef4444',
        }}
      >
        <div
          style={{
            color: '#ef4444',
            fontSize: '0.875rem',
            marginBottom: '0.5rem',
            fontWeight: '600',
          }}
        >
          ⚠️ Common Mistakes:
        </div>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.8 }}>
          <div>
            ❌ <code style={{ color: '#ef4444' }}>onClick=&#123;handleClick()&#125;</code> - Calls
            function immediately!
          </div>
          <div>
            ✅ <code style={{ color: '#22c55e' }}>onClick=&#123;handleClick&#125;</code> - Passes
            function reference
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            ❌ <code style={{ color: '#ef4444' }}>onClick=&#123;handleDelete(id)&#125;</code> -
            Calls function immediately!
          </div>
          <div>
            ✅{' '}
            <code style={{ color: '#22c55e' }}>onClick=&#123;() =&gt; handleDelete(id)&#125;</code>{' '}
            - Wraps in arrow function
          </div>
        </div>
      </div>
    </div>
  );
}
