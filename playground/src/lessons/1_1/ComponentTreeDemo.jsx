import { useState } from 'react';

export default function ComponentTreeDemo() {
  const [selected, setSelected] = useState(null);

  const components = [
    {
      id: 'app',
      name: 'App',
      color: '#3b82f6',
      description: 'The root component - everything lives inside App',
    },
    {
      id: 'header',
      name: 'Header',
      color: '#8b5cf6',
      description: 'Contains the logo and navigation',
    },
    {
      id: 'main',
      name: 'Main',
      color: '#10b981',
      description: 'The main content area with all sections',
    },
    {
      id: 'section',
      name: 'Section',
      color: '#f59e0b',
      description: 'Reusable section wrapper - used 5 times on this page!',
    },
    { id: 'demo', name: 'Demo', color: '#ec4899', description: 'Interactive demos like this one' },
  ];

  const selectedComp = components.find((c) => c.id === selected);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: 0, marginBottom: '1rem' }}>
          👇 Click a component to learn about it:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {components.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setSelected(selected === comp.id ? null : comp.id)}
              style={{
                padding: '0.625rem 1rem',
                backgroundColor: selected === comp.id ? comp.color : '#0f172a',
                borderRadius: '0.5rem',
                border: `2px solid ${comp.color}`,
                color: selected === comp.id ? 'white' : comp.color,
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {'<'}
              {comp.name}
              {' />'}
            </button>
          ))}
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#0f172a',
          padding: '1.25rem',
          borderRadius: '0.75rem',
          border: selectedComp ? `2px solid ${selectedComp.color}` : '2px solid #334155',
          minHeight: '80px',
        }}
      >
        {selectedComp ? (
          <div>
            <span
              style={{
                backgroundColor: selectedComp.color,
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '600',
              }}
            >
              {'<'}
              {selectedComp.name}
              {' />'}
            </span>
            <p style={{ color: '#cbd5e1', margin: '0.75rem 0 0', lineHeight: 1.6 }}>
              {selectedComp.description}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#64748b',
            }}
          >
            👆 Click a component above
          </div>
        )}
      </div>
    </div>
  );
}
