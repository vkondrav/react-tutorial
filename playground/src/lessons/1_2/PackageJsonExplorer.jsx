import { useState } from 'react';
import { HiOutlinePlay, HiOutlineCube } from 'react-icons/hi';

export default function PackageJsonExplorer() {
  const [active, setActive] = useState('scripts');
  const sections = {
    scripts: {
      icon: HiOutlinePlay,
      title: 'Scripts',
      code: `"scripts": {\n  "dev": "vite",\n  "build": "vite build"\n}`,
      desc: 'npm run dev starts the dev server',
    },
    deps: {
      icon: HiOutlineCube,
      title: 'Dependencies',
      code: `"dependencies": {\n  "react": "^19.1.0",\n  "react-dom": "^19.1.0"\n}`,
      desc: 'Packages bundled into production',
    },
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {Object.entries(sections).map(([key, s]) => {
          const IconComponent = s.icon;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`btn ${active === key ? 'btn-primary' : 'btn-outline'}`}
            >
              <IconComponent size={18} />
              {s.title}
            </button>
          );
        })}
      </div>

      <div className="card bg-base-200 overflow-hidden">
        <pre className="m-0 p-4 text-sm text-base-content/70">
          <code>{sections[active].code}</code>
        </pre>
        <div className="p-4 border-t border-base-300 text-base-content text-sm">
          {sections[active].desc}
        </div>
      </div>
    </div>
  );
}
