import { useState } from 'react';

export default function ProjectStructureExplorer() {
  const [selectedFile, setSelectedFile] = useState(null);

  const files = [
    {
      name: 'index.html',
      icon: '🌐',
      color: 'orange',
      colorHex: '#f97316',
      purpose: 'Entry point',
      description: 'The single HTML file with <div id="root">.',
      code: `<!DOCTYPE html>\n<html>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>`,
    },
    {
      name: 'src/main.jsx',
      icon: '🚀',
      color: 'violet',
      colorHex: '#8b5cf6',
      purpose: 'Bootstrap',
      description: 'Initializes React and mounts App.',
      code: `import { createRoot } from 'react-dom/client'\nimport App from './App.jsx'\n\ncreateRoot(document.getElementById('root')).render(<App />)`,
    },
    {
      name: 'src/App.jsx',
      icon: '⚛️',
      color: 'blue',
      colorHex: '#3b82f6',
      purpose: 'Root component',
      description: 'Your main React component.',
      code: `function App() {\n  return <h1>Hello, React!</h1>\n}\n\nexport default App`,
    },
    {
      name: 'package.json',
      icon: '📦',
      color: 'emerald',
      colorHex: '#22c55e',
      purpose: 'Dependencies',
      description: 'Project dependencies and scripts.',
      code: `{\n  "scripts": { "dev": "vite" },\n  "dependencies": { "react": "^19.1.0" }\n}`,
    },
  ];

  const colorClasses = {
    orange: {
      bg: 'bg-orange-500/20',
      border: 'border-orange-500',
      text: 'text-orange-500',
    },
    violet: {
      bg: 'bg-violet-500/20',
      border: 'border-violet-500',
      text: 'text-violet-500',
    },
    blue: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-500',
      text: 'text-blue-500',
    },
    emerald: {
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500',
      text: 'text-emerald-500',
    },
  };

  const selected = files.find((f) => f.name === selectedFile);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-slate-900 rounded-xl p-4 font-mono">
        <div className="text-slate-500 mb-3 text-sm">📂 playground/</div>
        <div className="flex flex-col gap-1 ml-4">
          {files.map((file) => {
            const colors = colorClasses[file.color];
            const isSelected = selectedFile === file.name;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFile(isSelected ? null : file.name)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-left text-sm w-full transition-colors ${
                  isSelected
                    ? `${colors.bg} ${colors.border} border ${colors.text}`
                    : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span>{file.icon}</span>
                <span className="flex-1">{file.name}</span>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                  {file.purpose}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`bg-slate-900 rounded-xl p-5 min-h-[150px] transition-colors ${
          selected
            ? `${colorClasses[selected.color].border} border`
            : 'border-slate-700 border'
        }`}
      >
        {selected ? (
          <div>
            <p className="text-slate-300 mt-0 mb-4">{selected.description}</p>
            <pre className="bg-slate-800 p-4 rounded-lg text-sm text-slate-400 overflow-auto m-0">
              <code>{selected.code}</code>
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            👆 Click a file to see its contents
          </div>
        )}
      </div>
    </div>
  );
}
