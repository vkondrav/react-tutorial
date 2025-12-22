import { useState } from 'react';
import {
  HiOutlineGlobeAlt,
  HiOutlineLightningBolt,
  HiOutlineCube,
  HiOutlineCursorClick,
} from 'react-icons/hi';
import { FaReact } from 'react-icons/fa';

export default function ProjectStructureExplorer() {
  const [selectedFile, setSelectedFile] = useState(null);

  const files = [
    {
      name: 'index.html',
      icon: HiOutlineGlobeAlt,
      color: 'warning',
      purpose: 'Entry point',
      description: 'The single HTML file with <div id="root">.',
      code: `<!DOCTYPE html>\n<html>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>`,
    },
    {
      name: 'src/main.jsx',
      icon: HiOutlineLightningBolt,
      color: 'secondary',
      purpose: 'Bootstrap',
      description: 'Initializes React and mounts App.',
      code: `import { createRoot } from 'react-dom/client'\nimport App from './App.jsx'\n\ncreateRoot(document.getElementById('root')).render(<App />)`,
    },
    {
      name: 'src/App.jsx',
      icon: FaReact,
      color: 'primary',
      purpose: 'Root component',
      description: 'Your main React component.',
      code: `function App() {\n  return <h1>Hello, React!</h1>\n}\n\nexport default App`,
    },
    {
      name: 'package.json',
      icon: HiOutlineCube,
      color: 'success',
      purpose: 'Dependencies',
      description: 'Project dependencies and scripts.',
      code: `{\n  "scripts": { "dev": "vite" },\n  "dependencies": { "react": "^19.1.0" }\n}`,
    },
  ];

  const colorClasses = {
    warning: {
      bg: 'bg-warning/20',
      border: 'border-warning',
      text: 'text-warning',
    },
    secondary: {
      bg: 'bg-secondary/20',
      border: 'border-secondary',
      text: 'text-secondary',
    },
    primary: {
      bg: 'bg-primary/20',
      border: 'border-primary',
      text: 'text-primary',
    },
    success: {
      bg: 'bg-success/20',
      border: 'border-success',
      text: 'text-success',
    },
  };

  const selected = files.find((f) => f.name === selectedFile);

  return (
    <div className="flex flex-col gap-4">
      <div className="card bg-base-200 p-4 font-mono">
        <div className="text-base-content/50 mb-3 text-sm flex items-center gap-2">
          <HiOutlineCube size={16} />
          playground/
        </div>
        <div className="flex flex-col gap-1 ml-4">
          {files.map((file) => {
            const colors = colorClasses[file.color];
            const isSelected = selectedFile === file.name;
            const IconComponent = file.icon;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFile(isSelected ? null : file.name)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-left text-sm w-full transition-colors ${
                  isSelected
                    ? `${colors.bg} ${colors.border} border ${colors.text}`
                    : 'bg-transparent border-transparent text-base-content/70 hover:bg-base-300'
                }`}
              >
                <IconComponent size={18} />
                <span className="flex-1">{file.name}</span>
                <span className="badge badge-sm bg-base-300 text-base-content/70">
                  {file.purpose}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`card bg-base-200 p-5 min-h-[150px] transition-colors ${
          selected ? `${colorClasses[selected.color].border} border-2` : 'border-base-300 border'
        }`}
      >
        {selected ? (
          <div>
            <p className="text-base-content mt-0 mb-4">{selected.description}</p>
            <pre className="bg-base-300 p-4 rounded-lg text-sm text-base-content/70 overflow-auto m-0">
              <code>{selected.code}</code>
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-base-content/50 gap-2">
            <HiOutlineCursorClick size={20} />
            <span>Click a file to see its contents</span>
          </div>
        )}
      </div>
    </div>
  );
}
