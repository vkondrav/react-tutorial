import { useState } from 'react';

export default function ComponentTreeDemo() {
  const [selected, setSelected] = useState(null);

  const components = [
    {
      id: 'app',
      name: 'App',
      color: 'blue',
      description: 'The root component - everything lives inside App',
    },
    {
      id: 'header',
      name: 'Header',
      color: 'violet',
      description: 'Contains the logo and navigation',
    },
    {
      id: 'main',
      name: 'Main',
      color: 'emerald',
      description: 'The main content area with all sections',
    },
    {
      id: 'section',
      name: 'Section',
      color: 'amber',
      description: 'Reusable section wrapper - used 5 times on this page!',
    },
    {
      id: 'demo',
      name: 'Demo',
      color: 'pink',
      description: 'Interactive demos like this one',
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      border: 'border-blue-500',
      text: 'text-blue-500',
    },
    violet: {
      bg: 'bg-violet-500',
      border: 'border-violet-500',
      text: 'text-violet-500',
    },
    emerald: {
      bg: 'bg-emerald-500',
      border: 'border-emerald-500',
      text: 'text-emerald-500',
    },
    amber: {
      bg: 'bg-amber-500',
      border: 'border-amber-500',
      text: 'text-amber-500',
    },
    pink: {
      bg: 'bg-pink-500',
      border: 'border-pink-500',
      text: 'text-pink-500',
    },
  };

  const selectedComp = components.find((c) => c.id === selected);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-slate-500 mt-0 mb-4">👇 Click a component to learn about it:</p>
        <div className="flex flex-wrap gap-2">
          {components.map((comp) => {
            const colors = colorClasses[comp.color];
            const isSelected = selected === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => setSelected(isSelected ? null : comp.id)}
                className={`px-4 py-2.5 rounded-lg border-2 text-sm font-semibold cursor-pointer transition-colors ${colors.border} ${
                  isSelected
                    ? `${colors.bg} text-white`
                    : `bg-slate-900 ${colors.text} hover:bg-slate-800`
                }`}
              >
                {'<'}
                {comp.name}
                {' />'}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`bg-slate-900 p-5 rounded-xl border-2 min-h-[80px] transition-colors ${
          selectedComp ? colorClasses[selectedComp.color].border : 'border-slate-700'
        }`}
      >
        {selectedComp ? (
          <div>
            <span
              className={`${colorClasses[selectedComp.color].bg} text-white px-3 py-1 rounded text-sm font-semibold`}
            >
              {'<'}
              {selectedComp.name}
              {' />'}
            </span>
            <p className="text-slate-300 mt-3 leading-relaxed">{selectedComp.description}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            👆 Click a component above
          </div>
        )}
      </div>
    </div>
  );
}
