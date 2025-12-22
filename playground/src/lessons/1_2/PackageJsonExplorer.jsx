import { useState } from 'react';

export default function PackageJsonExplorer() {
  const [active, setActive] = useState('scripts');
  const sections = {
    scripts: {
      icon: '▶️',
      title: 'Scripts',
      code: `"scripts": {\n  "dev": "vite",\n  "build": "vite build"\n}`,
      desc: 'npm run dev starts the dev server',
    },
    deps: {
      icon: '📦',
      title: 'Dependencies',
      code: `"dependencies": {\n  "react": "^19.1.0",\n  "react-dom": "^19.1.0"\n}`,
      desc: 'Packages bundled into production',
    },
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {Object.entries(sections).map(([key, s]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: active === key ? '#3b82f6' : '#0f172a',
              color: active === key ? 'white' : '#94a3b8',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            {s.icon} {s.title}
          </button>
        ))}
      </div>
      <div style={{ backgroundColor: '#0f172a', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <pre style={{ margin: 0, padding: '1rem', fontSize: '0.8125rem', color: '#94a3b8' }}>
          <code>{sections[active].code}</code>
        </pre>
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid #334155',
            color: '#cbd5e1',
            fontSize: '0.875rem',
          }}
        >
          {sections[active].desc}
        </div>
      </div>
    </div>
  );
}
