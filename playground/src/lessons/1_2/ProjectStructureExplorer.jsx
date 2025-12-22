import { useState } from 'react';

export default function ProjectStructureExplorer() {
  const [selectedFile, setSelectedFile] = useState(null);

  const files = [
    {
      name: 'index.html',
      icon: '🌐',
      color: '#f97316',
      purpose: 'Entry point',
      description: 'The single HTML file with <div id="root">.',
      code: `<!DOCTYPE html>\n<html>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>`,
    },
    {
      name: 'src/main.jsx',
      icon: '🚀',
      color: '#8b5cf6',
      purpose: 'Bootstrap',
      description: 'Initializes React and mounts App.',
      code: `import { createRoot } from 'react-dom/client'\nimport App from './App.jsx'\n\ncreateRoot(document.getElementById('root')).render(<App />)`,
    },
    {
      name: 'src/App.jsx',
      icon: '⚛️',
      color: '#3b82f6',
      purpose: 'Root component',
      description: 'Your main React component.',
      code: `function App() {\n  return <h1>Hello, React!</h1>\n}\n\nexport default App`,
    },
    {
      name: 'package.json',
      icon: '📦',
      color: '#22c55e',
      purpose: 'Dependencies',
      description: 'Project dependencies and scripts.',
      code: `{\n  "scripts": { "dev": "vite" },\n  "dependencies": { "react": "^19.1.0" }\n}`,
    },
  ];

  const selected = files.find((f) => f.name === selectedFile);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div
        style={{
          backgroundColor: '#0f172a',
          borderRadius: '0.75rem',
          padding: '1rem',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ color: '#64748b', marginBottom: '0.75rem', fontSize: '0.8125rem' }}>
          📂 playground/
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginLeft: '1rem' }}
        >
          {files.map((file) => (
            <button
              key={file.name}
              onClick={() => setSelectedFile(selectedFile === file.name ? null : file.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: selectedFile === file.name ? `${file.color}22` : 'transparent',
                border:
                  selectedFile === file.name ? `1px solid ${file.color}` : '1px solid transparent',
                borderRadius: '0.375rem',
                color: selectedFile === file.name ? file.color : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.875rem',
                width: '100%',
              }}
            >
              <span>{file.icon}</span>
              <span style={{ flex: 1 }}>{file.name}</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#64748b',
                  backgroundColor: '#1e293b',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '0.25rem',
                }}
              >
                {file.purpose}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#0f172a',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          minHeight: '150px',
          border: selected ? `1px solid ${selected.color}44` : '1px solid #334155',
        }}
      >
        {selected ? (
          <div>
            <p style={{ color: '#cbd5e1', marginTop: 0, marginBottom: '1rem' }}>
              {selected.description}
            </p>
            <pre
              style={{
                backgroundColor: '#1e293b',
                padding: '1rem',
                borderRadius: '0.5rem',
                fontSize: '0.8125rem',
                color: '#94a3b8',
                overflow: 'auto',
                margin: 0,
              }}
            >
              <code>{selected.code}</code>
            </pre>
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
            👆 Click a file to see its contents
          </div>
        )}
      </div>
    </div>
  );
}
