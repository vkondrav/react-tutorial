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
      <div className="flex gap-2 mb-4">
        {Object.entries(sections).map(([key, s]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-4 py-2 rounded-lg border border-slate-700 cursor-pointer text-sm transition-colors ${
              active === key
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 rounded-xl overflow-hidden">
        <pre className="m-0 p-4 text-sm text-slate-400">
          <code>{sections[active].code}</code>
        </pre>
        <div className="p-4 border-t border-slate-700 text-slate-300 text-sm">
          {sections[active].desc}
        </div>
      </div>
    </div>
  );
}
