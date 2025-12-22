import { useState } from 'react';

export default function PatternComparisonDemo() {
  const [selectedPattern, setSelectedPattern] = useState('ternary');
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [hasError, setHasError] = useState(false);

  const patterns = [
    { id: 'ternary', name: 'Ternary ?:', color: '#3b82f6' },
    { id: 'and', name: 'Logical &&', color: '#22c55e' },
    { id: 'early', name: 'Early Return', color: '#f59e0b' },
    { id: 'variable', name: 'Variable', color: '#8b5cf6' },
  ];

  // Simulate loading
  const simulateLoad = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      setIsLoading(false);
      setHasData(true);
    }, 1500);
  };

  return (
    <div style={{
      backgroundColor: '#1e293b',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      marginTop: '1rem',
    }}>
      {/* Pattern Selector */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginBottom: '1.5rem',
      }}>
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPattern(p.id)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedPattern === p.id ? p.color : '#0f172a',
              border: `2px solid ${selectedPattern === p.id ? p.color : '#334155'}`,
              borderRadius: '0.5rem',
              color: 'white',
              cursor: 'pointer',
              fontWeight: selectedPattern === p.id ? '600' : '400',
              transition: 'all 0.2s',
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* State Controls */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#0f172a',
        borderRadius: '0.5rem',
      }}>
        <button
          onClick={simulateLoad}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '0.375rem',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          🔄 Simulate Load
        </button>
        <button
          onClick={() => { setHasData(!hasData); setHasError(false); }}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: hasData ? '#22c55e' : '#475569',
            border: 'none',
            borderRadius: '0.375rem',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          {hasData ? '📦 Has Data' : '📭 No Data'}
        </button>
        <button
          onClick={() => { setHasError(!hasError); setIsLoading(false); }}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: hasError ? '#ef4444' : '#475569',
            border: 'none',
            borderRadius: '0.375rem',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          {hasError ? '❌ Error' : '✓ No Error'}
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
      }}>
        {/* Code Panel */}
        <div style={{
          backgroundColor: '#0f172a',
          borderRadius: '0.5rem',
          padding: '1rem',
          overflow: 'auto',
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: patterns.find(p => p.id === selectedPattern)?.color,
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}>
            Code Pattern
          </div>
          
          <pre style={{
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            margin: 0,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
          }}>
            {selectedPattern === 'ternary' && (
              <>
                <span style={{ color: '#c084fc' }}>{'function '}</span>
                <span style={{ color: '#f8fafc' }}>DataDisplay() {'{'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  return ('}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'    <div>'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'      '}</span>
                <span style={{ color: '#c084fc' }}>{'{'}</span>
                <span style={{ color: '#f8fafc' }}>isLoading</span>{'\n'}
                <span style={{ color: '#f59e0b' }}>{'        ? '}</span>
                <span style={{ color: '#22c55e' }}>{'<Spinner />'}</span>{'\n'}
                <span style={{ color: '#f59e0b' }}>{'        : '}</span>
                <span style={{ color: '#f8fafc' }}>hasError</span>{'\n'}
                <span style={{ color: '#f59e0b' }}>{'        ? '}</span>
                <span style={{ color: '#ef4444' }}>{'<Error />'}</span>{'\n'}
                <span style={{ color: '#f59e0b' }}>{'        : '}</span>
                <span style={{ color: '#f8fafc' }}>hasData</span>{'\n'}
                <span style={{ color: '#f59e0b' }}>{'        ? '}</span>
                <span style={{ color: '#3b82f6' }}>{'<DataList />'}</span>{'\n'}
                <span style={{ color: '#f59e0b' }}>{'        : '}</span>
                <span style={{ color: '#94a3b8' }}>{'<Empty />'}</span>
                <span style={{ color: '#c084fc' }}>{'}'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'    </div>'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  );'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'}'}</span>
              </>
            )}
            
            {selectedPattern === 'and' && (
              <>
                <span style={{ color: '#c084fc' }}>{'function '}</span>
                <span style={{ color: '#f8fafc' }}>DataDisplay() {'{'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  return ('}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'    <div>'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'      '}</span>
                <span style={{ color: '#c084fc' }}>{'{'}</span>
                <span style={{ color: '#f8fafc' }}>isLoading </span>
                <span style={{ color: '#f59e0b' }}>{'&& '}</span>
                <span style={{ color: '#22c55e' }}>{'<Spinner />'}</span>
                <span style={{ color: '#c084fc' }}>{'}'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'      '}</span>
                <span style={{ color: '#c084fc' }}>{'{'}</span>
                <span style={{ color: '#f8fafc' }}>hasError </span>
                <span style={{ color: '#f59e0b' }}>{'&& '}</span>
                <span style={{ color: '#ef4444' }}>{'<Error />'}</span>
                <span style={{ color: '#c084fc' }}>{'}'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'      '}</span>
                <span style={{ color: '#c084fc' }}>{'{'}</span>
                <span style={{ color: '#f8fafc' }}>hasData </span>
                <span style={{ color: '#f59e0b' }}>{'&& '}</span>
                <span style={{ color: '#3b82f6' }}>{'<DataList />'}</span>
                <span style={{ color: '#c084fc' }}>{'}'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'      '}</span>
                <span style={{ color: '#c084fc' }}>{'{'}</span>
                <span style={{ color: '#f8fafc' }}>{'!isLoading && !hasData '}</span>
                <span style={{ color: '#f59e0b' }}>{'&& '}</span>
                <span style={{ color: '#94a3b8' }}>{'<Empty />'}</span>
                <span style={{ color: '#c084fc' }}>{'}'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'    </div>'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  );'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'}'}</span>
              </>
            )}

            {selectedPattern === 'early' && (
              <>
                <span style={{ color: '#c084fc' }}>{'function '}</span>
                <span style={{ color: '#f8fafc' }}>DataDisplay() {'{'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  '}</span>
                <span style={{ color: '#c084fc' }}>if </span>
                <span style={{ color: '#f8fafc' }}>(isLoading) </span>
                <span style={{ color: '#c084fc' }}>return </span>
                <span style={{ color: '#22c55e' }}>{'<Spinner />'}</span>
                <span style={{ color: '#f8fafc' }}>;</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  '}</span>
                <span style={{ color: '#c084fc' }}>if </span>
                <span style={{ color: '#f8fafc' }}>(hasError) </span>
                <span style={{ color: '#c084fc' }}>return </span>
                <span style={{ color: '#ef4444' }}>{'<Error />'}</span>
                <span style={{ color: '#f8fafc' }}>;</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  '}</span>
                <span style={{ color: '#c084fc' }}>if </span>
                <span style={{ color: '#f8fafc' }}>(!hasData) </span>
                <span style={{ color: '#c084fc' }}>return </span>
                <span style={{ color: '#94a3b8' }}>{'<Empty />'}</span>
                <span style={{ color: '#f8fafc' }}>;</span>{'\n\n'}
                <span style={{ color: '#64748b' }}>{'  // Happy path!'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  '}</span>
                <span style={{ color: '#c084fc' }}>return </span>
                <span style={{ color: '#3b82f6' }}>{'<DataList />'}</span>
                <span style={{ color: '#f8fafc' }}>;</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'}'}</span>
              </>
            )}

            {selectedPattern === 'variable' && (
              <>
                <span style={{ color: '#c084fc' }}>{'function '}</span>
                <span style={{ color: '#f8fafc' }}>DataDisplay() {'{'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  '}</span>
                <span style={{ color: '#c084fc' }}>let </span>
                <span style={{ color: '#f8fafc' }}>content;</span>{'\n\n'}
                <span style={{ color: '#f8fafc' }}>{'  '}</span>
                <span style={{ color: '#c084fc' }}>if </span>
                <span style={{ color: '#f8fafc' }}>(isLoading) {'{'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'    content = '}</span>
                <span style={{ color: '#22c55e' }}>{'<Spinner />'}</span>
                <span style={{ color: '#f8fafc' }}>;</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  } '}</span>
                <span style={{ color: '#c084fc' }}>else if </span>
                <span style={{ color: '#f8fafc' }}>(hasError) {'{'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'    content = '}</span>
                <span style={{ color: '#ef4444' }}>{'<Error />'}</span>
                <span style={{ color: '#f8fafc' }}>;</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  } '}</span>
                <span style={{ color: '#c084fc' }}>else if </span>
                <span style={{ color: '#f8fafc' }}>(hasData) {'{'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'    content = '}</span>
                <span style={{ color: '#3b82f6' }}>{'<DataList />'}</span>
                <span style={{ color: '#f8fafc' }}>;</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  } '}</span>
                <span style={{ color: '#c084fc' }}>else </span>
                <span style={{ color: '#f8fafc' }}>{'{'}</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'    content = '}</span>
                <span style={{ color: '#94a3b8' }}>{'<Empty />'}</span>
                <span style={{ color: '#f8fafc' }}>;</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'  }'}</span>{'\n\n'}
                <span style={{ color: '#f8fafc' }}>{'  '}</span>
                <span style={{ color: '#c084fc' }}>return </span>
                <span style={{ color: '#f8fafc' }}>{'<div>{content}</div>'}</span>
                <span style={{ color: '#f8fafc' }}>;</span>{'\n'}
                <span style={{ color: '#f8fafc' }}>{'}'}</span>
              </>
            )}
          </pre>
        </div>

        {/* Preview Panel */}
        <div style={{
          backgroundColor: '#0f172a',
          borderRadius: '0.5rem',
          padding: '1rem',
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#3b82f6',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}>
            Live Preview
          </div>
          
          <div style={{
            minHeight: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e293b',
            borderRadius: '0.375rem',
            padding: '1rem',
          }}>
            {isLoading ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid #334155',
                  borderTopColor: '#3b82f6',
                  borderRadius: '50%',
                  margin: '0 auto 0.75rem',
                  animation: 'spin 1s linear infinite',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <div style={{ color: '#64748b' }}>Loading...</div>
              </div>
            ) : hasError ? (
              <div style={{ textAlign: 'center', color: '#ef4444' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❌</div>
                <div style={{ fontWeight: '600' }}>Error Loading Data</div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  Please try again
                </div>
              </div>
            ) : hasData ? (
              <div style={{ width: '100%' }}>
                <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#22c55e' }}>
                  📦 Data Loaded!
                </div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: '#0f172a',
                      borderRadius: '0.25rem',
                      marginBottom: '0.25rem',
                      fontSize: '0.875rem',
                    }}
                  >
                    Item {i}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#64748b' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                <div>No data available</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pattern Tips */}
      <div style={{
        marginTop: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        <div style={{
          padding: '1rem',
          backgroundColor: '#0f172a',
          borderRadius: '0.5rem',
          borderTop: '3px solid #3b82f6',
        }}>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#3b82f6' }}>
            Ternary ?: 
          </div>
          <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
            Best for simple either/or. Avoid nesting more than 2 deep.
          </div>
        </div>
        
        <div style={{
          padding: '1rem',
          backgroundColor: '#0f172a',
          borderRadius: '0.5rem',
          borderTop: '3px solid #22c55e',
        }}>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#22c55e' }}>
            Logical &&
          </div>
          <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
            Best for show/hide one thing. Watch out for 0 gotcha!
          </div>
        </div>
        
        <div style={{
          padding: '1rem',
          backgroundColor: '#0f172a',
          borderRadius: '0.5rem',
          borderTop: '3px solid #f59e0b',
        }}>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#f59e0b' }}>
            Early Return
          </div>
          <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
            Best for multiple conditions. Keeps "happy path" clean.
          </div>
        </div>
        
        <div style={{
          padding: '1rem',
          backgroundColor: '#0f172a',
          borderRadius: '0.5rem',
          borderTop: '3px solid #8b5cf6',
        }}>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#8b5cf6' }}>
            Variable
          </div>
          <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
            Best when logic is complex. Extract logic from JSX.
          </div>
        </div>
      </div>
    </div>
  );
}

